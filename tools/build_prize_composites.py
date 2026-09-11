from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path("/Users/romankadevich/Downloads")
OUT = ROOT / "assets" / "images"

SPECS = (
    ("приз телефон.png", "prize-phone-composite.png", "phone", (240, 125, 610, 555)),
    ("приз комбайн.png", "prize-mixer-composite.png", "mixer", (175, 25, 610, 540)),
    ("приз аэрогриль.png", "prize-airfryer-composite.png", "airfryer", (225, 115, 570, 550)),
    ("приз подарочная карта.png", "prize-gift-card-composite.png", "gift", (145, 160, 650, 550)),
)

DESIGN_ART_WIDTH = 787  # 393.6px at the 2x Figma export scale
BADGE_X = {
    "phone": 467,
    "mixer": 512,
    "airfryer": 470,
    "gift": 450,
}


def black_to_alpha(image: Image.Image) -> Image.Image:
    """Convert an additive-on-black glow to ordinary RGBA transparency."""
    rgba = np.asarray(image.convert("RGBA"), dtype=np.float32)
    rgb = rgba[..., :3]
    source_alpha = rgba[..., 3] / 255.0
    intensity = rgb.max(axis=2) / 255.0
    alpha = np.clip(intensity * source_alpha, 0.0, 1.0)
    safe = np.maximum(intensity[..., None], 1 / 255.0)
    straight_rgb = np.clip(rgb / safe, 0, 255)
    result = np.dstack((straight_rgb, alpha * 255)).astype(np.uint8)
    result[alpha <= 0.002] = 0
    return Image.fromarray(result, "RGBA")


def fill_enclosed_holes(mask: Image.Image, zones: tuple[tuple[int, int, int, int], ...]) -> Image.Image:
    result = np.asarray(mask, dtype=np.uint8) > 0
    for left, top, right, bottom in zones:
        region = Image.fromarray((result[top:bottom, left:right] * 255).astype(np.uint8), "L")
        closed = np.asarray(region.filter(ImageFilter.MaxFilter(7)), dtype=np.uint8) > 0
        height, width = closed.shape
        exterior = np.zeros_like(closed)
        queue: deque[tuple[int, int]] = deque()
        for x in range(width):
            queue.extend(((0, x), (height - 1, x)))
        for y in range(height):
            queue.extend(((y, 0), (y, width - 1)))
        while queue:
            y, x = queue.popleft()
            if y < 0 or x < 0 or y >= height or x >= width or closed[y, x] or exterior[y, x]:
                continue
            exterior[y, x] = True
            queue.extend(((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)))
        holes = (~closed) & (~exterior)
        result[top:bottom, left:right] |= holes
    return Image.fromarray((result * 255).astype(np.uint8), "L")


def keep_large_components(mask: Image.Image, min_area: int, max_aspect: float | None = None) -> Image.Image:
    source = np.asarray(mask, dtype=np.uint8) > 0
    height, width = source.shape
    seen = np.zeros_like(source)
    kept = np.zeros_like(source)
    for start_y, start_x in zip(*np.where(source & ~seen)):
        if seen[start_y, start_x]:
            continue
        queue = deque(((int(start_y), int(start_x)),))
        seen[start_y, start_x] = True
        points: list[tuple[int, int]] = []
        while queue:
            y, x = queue.popleft()
            points.append((y, x))
            for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if 0 <= ny < height and 0 <= nx < width and source[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    queue.append((ny, nx))
        if len(points) < min_area:
            continue
        ys = [point[0] for point in points]
        xs = [point[1] for point in points]
        component_width = max(xs) - min(xs) + 1
        component_height = max(ys) - min(ys) + 1
        if max_aspect is not None and component_width / component_height > max_aspect:
            continue
        min_y, max_y = min(ys), max(ys)
        min_x, max_x = min(xs), max(xs)
        component = np.zeros((max_y - min_y + 1, max_x - min_x + 1), dtype=bool)
        for y, x in points:
            component[y - min_y, x - min_x] = True
        exterior = np.zeros_like(component)
        boundary = deque()
        comp_height, comp_width = component.shape
        for x in range(comp_width):
            boundary.extend(((0, x), (comp_height - 1, x)))
        for y in range(comp_height):
            boundary.extend(((y, 0), (y, comp_width - 1)))
        while boundary:
            y, x = boundary.popleft()
            if y < 0 or x < 0 or y >= comp_height or x >= comp_width or component[y, x] or exterior[y, x]:
                continue
            exterior[y, x] = True
            boundary.extend(((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)))
        filled = component | ((~component) & (~exterior))
        kept[min_y : max_y + 1, min_x : max_x + 1] |= filled
    return Image.fromarray((kept * 255).astype(np.uint8), "L")


def clean_badge(path: Path) -> Image.Image:
    badge = Image.open(path).convert("RGBA")
    glow = black_to_alpha(badge)
    inner = Image.new("L", badge.size)
    draw = ImageDraw.Draw(inner)
    margin_x = round(badge.width * 0.23)
    margin_top = round(badge.height * 0.22)
    margin_bottom = round(badge.height * 0.20)
    draw.ellipse((margin_x, margin_top, badge.width - margin_x, badge.height - margin_bottom), fill=255)
    core = badge.copy()
    core.putalpha(Image.fromarray(
        np.minimum(np.asarray(core.getchannel("A")), np.asarray(inner)).astype(np.uint8),
        "L",
    ))
    glow.alpha_composite(core)
    return glow


def product_mask(source: Image.Image, kind: str, zone: tuple[int, int, int, int]) -> Image.Image:
    pixels = np.asarray(source, dtype=np.int16)
    rgb = pixels[..., :3]
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    high = rgb.max(axis=2)
    low = rgb.min(axis=2)
    mask = np.zeros(source.size[::-1], dtype=bool)
    left, top, right, bottom = zone
    region = np.zeros_like(mask)
    region[top:bottom, left:right] = True

    if kind == "phone":
        seed = (red > 105) & (red > green * 1.48) & (green > blue * 1.08)
    elif kind == "mixer":
        red_body = (red > 65) & (red > green * 1.42) & (red > blue * 1.22)
        neutral_metal = ((high - low) < 38) & (high > 68)
        seed = red_body | neutral_metal
    elif kind == "airfryer":
        seed = ((high - low) < 38) & (high > 68)
    else:
        gift = Image.new("L", source.size)
        gift_draw = ImageDraw.Draw(gift)
        gift_draw.polygon(((158, 305), (528, 178), (598, 395), (244, 527)), fill=255)
        gift_draw.polygon(((203, 315), (574, 226), (630, 461), (270, 541)), fill=255)
        return gift

    mask = seed & region & (pixels[..., 3] > 8)
    initial = Image.fromarray((mask * 255).astype(np.uint8), "L").filter(ImageFilter.MaxFilter(3))
    if kind == "phone":
        initial = keep_large_components(initial, min_area=900, max_aspect=1.15)
        phone_shapes = Image.new("L", source.size)
        shape_draw = ImageDraw.Draw(phone_shapes)
        shape_draw.polygon(((252, 151), (418, 145), (482, 501), (322, 536)), fill=255)
        shape_draw.polygon(((428, 149), (596, 182), (529, 545), (342, 513)), fill=255)
        initial = Image.fromarray(
            np.minimum(np.asarray(initial), np.asarray(phone_shapes)).astype(np.uint8),
            "L",
        )
    else:
        initial = keep_large_components(initial, min_area=120)

    if kind == "airfryer":
        fryer_body = Image.new("L", source.size)
        fryer_draw = ImageDraw.Draw(fryer_body)
        fryer_draw.rounded_rectangle((250, 143, 544, 541), radius=18, fill=255)
        initial = Image.fromarray(
            np.maximum(np.asarray(initial), np.asarray(fryer_body)).astype(np.uint8),
            "L",
        )

    # Do not accidentally retain the black export rectangle behind the badge.
    # Re-add only true product-colored pixels in the overlap, so the product
    # can still sit above the medallion exactly as it does in Figma.
    badge_x = BADGE_X[kind]
    badge_width = 272 if kind == "gift" else 280
    badge_height = 292 if kind == "gift" else 300
    final_mask = np.asarray(initial, dtype=np.uint8).copy()
    if kind != "phone":
        final_mask[0:badge_height, badge_x : badge_x + badge_width] = 0
        seed_mask = (seed & region & (pixels[..., 3] > 8)).astype(np.uint8) * 255
        final_mask[0:badge_height, badge_x : badge_x + badge_width] = seed_mask[
            0:badge_height, badge_x : badge_x + badge_width
        ]
    if kind == "mixer":
        warm_ring = (
            (red > green * 1.10)
            & (red < green * 2.10)
            & (green > blue * 1.30)
            & (green > 28)
        )
        final_mask[warm_ring] = 0
    initial = Image.fromarray(final_mask, "L")
    return initial


def build(source_name: str, output_name: str, kind: str, zone: tuple[int, int, int, int]) -> None:
    source = Image.open(DOWNLOADS / source_name).convert("RGBA")
    source = source.crop((0, 0, source.width, min(646, source.height)))

    glow_source = Image.open(OUT / "prize-card-bg.png").convert("RGBA")
    glow_height = round(DESIGN_ART_WIDTH * glow_source.height / glow_source.width)
    glow_raw = glow_source.resize((DESIGN_ART_WIDTH, glow_height), Image.Resampling.LANCZOS)
    glow_x = (source.width - DESIGN_ART_WIDTH) // 2
    glow_y = source.height - glow_height

    foreground_mask = product_mask(source, kind, zone)

    fg = source.copy()
    fg_alpha = np.minimum(
        np.asarray(fg.getchannel("A"), dtype=np.uint16),
        np.asarray(foreground_mask, dtype=np.uint16),
    ).astype(np.uint8)
    fg.putalpha(Image.fromarray(fg_alpha, "L"))

    clean_glow = black_to_alpha(glow_raw)
    result = Image.new("RGBA", source.size)
    result.alpha_composite(clean_glow, (glow_x, glow_y))

    badge_name = "prize-badge-200.png" if kind == "gift" else "prize-badge-12.png"
    badge = clean_badge(OUT / badge_name)
    badge = badge.resize((badge.width * 2, badge.height * 2), Image.Resampling.LANCZOS)
    badge_x = BADGE_X[kind]
    result.alpha_composite(badge, (badge_x, 0))
    result.alpha_composite(fg)
    result.save(OUT / output_name, optimize=True)


for spec in SPECS:
    build(*spec)

function enableTouchSwipe(element, { maxWidth, onNext, onPrevious }) {
  let activePointer = null;
  let startX = 0;
  let startY = 0;
  let lockedAxis = null;
  let suppressClickUntil = 0;

  element.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch" || window.innerWidth > maxWidth) return;
    activePointer = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    lockedAxis = null;
  });

  element.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer || lockedAxis) return;
    const distanceX = Math.abs(event.clientX - startX);
    const distanceY = Math.abs(event.clientY - startY);
    if (Math.max(distanceX, distanceY) < 10) return;
    lockedAxis = distanceX > distanceY ? "horizontal" : "vertical";
  });

  element.addEventListener("pointerup", (event) => {
    if (event.pointerId !== activePointer) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    const threshold = Math.min(70, Math.max(40, element.clientWidth * 0.12));
    const isSwipe = lockedAxis === "horizontal"
      && Math.abs(distanceX) >= threshold
      && Math.abs(distanceX) > Math.abs(distanceY) * 1.2;

    activePointer = null;
    lockedAxis = null;

    if (!isSwipe) return;
    suppressClickUntil = performance.now() + 400;
    if (distanceX < 0) onNext();
    else onPrevious();
  });

  element.addEventListener("pointercancel", () => {
    activePointer = null;
    lockedAxis = null;
  });

  element.addEventListener("click", (event) => {
    if (performance.now() >= suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}

const prizeTrack = document.querySelector("[data-prize-track]");
const prizeStatus = document.querySelector("[data-prize-status]");
const prizeCards = [...prizeTrack.children];
let currentPrize = 0;

function renderCurrentPrize() {
  prizeCards.forEach((card, index) => card.classList.toggle("is-current", index === currentPrize));
  prizeStatus.textContent = `${currentPrize + 1} из ${prizeCards.length}: ${prizeCards[currentPrize].textContent.trim()}`;
}

function showPreviousPrize() {
  currentPrize = (currentPrize - 1 + prizeCards.length) % prizeCards.length;
  renderCurrentPrize();
}

function showNextPrize() {
  currentPrize = (currentPrize + 1) % prizeCards.length;
  renderCurrentPrize();
}

document.querySelector("[data-prize-prev]").addEventListener("click", showPreviousPrize);
document.querySelector("[data-prize-next]").addEventListener("click", showNextPrize);

enableTouchSwipe(prizeTrack, {
  maxWidth: 767,
  onNext: showNextPrize,
  onPrevious: showPreviousPrize,
});

const productsTrack = document.querySelector("[data-products-track]");
const productsStatus = document.querySelector("[data-products-status]");
const productButtons = [...productsTrack.querySelectorAll("[data-product-open]")];
const productSlides = productButtons.map((button) => ({
  src: button.dataset.productSrc,
  alt: button.querySelector("img").alt,
}));
let currentProduct = 0;

function productsPerView() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 2;
  return 3;
}

function renderProducts() {
  const perView = productsPerView();
  const maxIndex = Math.max(0, productSlides.length - perView);
  currentProduct = Math.min(currentProduct, maxIndex);
  const gap = window.innerWidth < 768 ? 0 : 20;
  const viewport = document.querySelector(".products-viewport");
  const slideWidth = (viewport.clientWidth - gap * (perView - 1)) / perView;
  productsTrack.style.transform = `translateX(-${currentProduct * (slideWidth + gap)}px)`;
  productsStatus.textContent = `Показана листовка ${currentProduct + 1} из ${productSlides.length}`;
}

function showPreviousProduct() {
  const maxIndex = Math.max(0, productSlides.length - productsPerView());
  currentProduct = currentProduct <= 0 ? maxIndex : currentProduct - 1;
  renderProducts();
}

function showNextProduct() {
  const maxIndex = Math.max(0, productSlides.length - productsPerView());
  currentProduct = currentProduct >= maxIndex ? 0 : currentProduct + 1;
  renderProducts();
}

document.querySelector("[data-products-prev]").addEventListener("click", showPreviousProduct);
document.querySelector("[data-products-next]").addEventListener("click", showNextProduct);

enableTouchSwipe(document.querySelector(".products-viewport"), {
  maxWidth: 1199,
  onNext: showNextProduct,
  onPrevious: showPreviousProduct,
});

window.addEventListener("resize", renderProducts);
window.addEventListener("load", renderProducts);
renderProducts();

const faqContainer = document.querySelector("[data-faq]");
faqContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".faq-question");
  if (!button) return;
  const current = button.closest(".faq-item");
  const willOpen = !current.classList.contains("is-open");

  faqContainer.querySelectorAll(".faq-item").forEach((item) => {
    const itemButton = item.querySelector(".faq-question");
    const icon = itemButton.querySelector("img");
    const open = item === current && willOpen;
    item.classList.toggle("is-open", open);
    itemButton.setAttribute("aria-expanded", String(open));
    icon.src = `assets/icons/${open ? "caret-up" : "caret-down"}.svg`;
  });
});

const menu = document.querySelector("[data-menu]");
const menuOpenButton = document.querySelector("[data-menu-open]");
const menuCloseButton = document.querySelector("[data-menu-close]");
let focusBeforeMenu = null;

function focusableIn(element) {
  return [...element.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
}

function openMenu() {
  focusBeforeMenu = document.activeElement;
  menu.classList.add("is-open");
  menu.setAttribute("aria-hidden", "false");
  menuOpenButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
  requestAnimationFrame(() => menuCloseButton.focus());
}

function closeMenu({ restoreFocus = true } = {}) {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  menuOpenButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  if (restoreFocus) focusBeforeMenu?.focus({ preventScroll: true });
}

menuOpenButton.addEventListener("click", openMenu);
menuCloseButton.addEventListener("click", closeMenu);
menu.querySelectorAll("[data-menu-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    const target = hash?.startsWith("#") ? document.querySelector(hash) : null;
    if (!target) {
      closeMenu({ restoreFocus: false });
      return;
    }

    event.preventDefault();
    closeMenu({ restoreFocus: false });

    requestAnimationFrame(() => {
      const headerHeight = document.querySelector("[data-header]")?.getBoundingClientRect().height || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      window.scrollTo(0, Math.max(0, targetTop));

      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });
    });
  });
});

menu.addEventListener("click", (event) => {
  if (event.target === menu) closeMenu();
});

menu.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = focusableIn(menu);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const sections = [...document.querySelectorAll('.desktop-nav a[href^="#"]')]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(`a[href="#${entry.target.id}"]`).forEach((link) => {
      link.closest("nav")?.querySelectorAll("a").forEach((item) => item.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach((section) => navObserver.observe(section));

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCounter = document.querySelector("[data-lightbox-counter]");
const lightboxCloseButton = lightbox.querySelector(".lightbox__close");
let lightboxIndex = 0;
let focusBeforeLightbox = null;

function renderLightbox() {
  const slide = productSlides[lightboxIndex];
  lightboxImage.src = slide.src;
  lightboxImage.alt = slide.alt;
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${productSlides.length}`;
}

function openLightbox(index = 0) {
  focusBeforeLightbox = document.activeElement;
  lightboxIndex = index;
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  requestAnimationFrame(() => lightboxCloseButton.focus());
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  focusBeforeLightbox?.focus();
}

productsTrack.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product-open]");
  if (button) openLightbox(Number(button.dataset.productOpen));
});

document.querySelector("[data-lightbox-open]")?.addEventListener("click", () => openLightbox(0));
lightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => element.addEventListener("click", closeLightbox));
lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => {
  lightboxIndex = (lightboxIndex - 1 + productSlides.length) % productSlides.length;
  renderLightbox();
});
lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => {
  lightboxIndex = (lightboxIndex + 1) % productSlides.length;
  renderLightbox();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") lightbox.querySelector("[data-lightbox-prev]").click();
  if (event.key === "ArrowRight") lightbox.querySelector("[data-lightbox-next]").click();
  if (event.key !== "Tab") return;
  const focusable = focusableIn(lightbox);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

renderCurrentPrize();

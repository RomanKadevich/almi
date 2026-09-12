const navigationItems = [
  { id: "pravila", label: "Правила" },
  { id: "prizes", label: "Призы" },
  { id: "draw-stages", label: "Этапы розыгрыша" },
  { id: "spisok-tovarov", label: "Игровые товары" },
  { id: "faq", label: "Вопрос-ответ" },
  { id: "winners", label: "Победители" },
];

const rules = [
  "Покупайте игровые товары на сумму от <em>2 рублей</em> в одном чеке с применением карты «Выгода!».",
  "Подтвердите согласие на участие в игре в личном кабинете на сайте <em>VIGODA.BY</em>.",
  "Участвуйте в розыгрыше призов.",
];

const prizes = [
  { image: "assets/images/prize-phone.webp?v=2", composite: true, quantity: 12, title: "Телефон<br>iPhone 17 Pro", alt: "Двенадцать оранжевых смартфонов iPhone 17 Pro" },
  { image: "assets/images/prize-mixer.webp?v=2", composite: true, quantity: 12, title: "Кухонный комбайн<br>RAGEX", alt: "Двенадцать кухонных комбайнов RAGEX" },
  { image: "assets/images/prize-airfryer.webp?v=2", composite: true, quantity: 12, title: "Аэрогриль<br>Tefal", alt: "Двенадцать аэрогрилей Tefal" },
  { image: "assets/images/prize-gift-card.webp?v=2", composite: true, quantity: 200, title: "Подарочная карта<br>в ALMI на 100 рублей", alt: "Двести подарочных карт ALMI номиналом 100 рублей" },
];

const stages = [
  { marker: "1", from: "с 21.09.2026", to: "по 04.10.2026", label: "Розыгрыш призов:", draw: "07.10.2026" },
  { marker: "2", from: "с 05.10.2026", to: "по 18.10.2026", label: "Розыгрыш призов:", draw: "21.10.2026" },
  { marker: "3", from: "с 19.10.2026", to: "по 01.11.2026", label: "Розыгрыш призов:", draw: "04.11.2026" },
  { marker: "4", from: "с 02.11.2026", to: "по 15.11.2026", label: "Розыгрыш призов:", draw: "18.11.2026" },
  { marker: "star", from: "с 21.09.2026", to: "по 15.11.2026", label: "Розыгрыш главного приза:", draw: "19.11.2026" },
];

const productSlides = [
  { src: "assets/images/products-flyer-1.webp", alt: "Игровые товары рекламной игры — листовка 1 из 4" },
  { src: "assets/images/products-flyer-2.webp", alt: "Игровые товары рекламной игры — листовка 2 из 4" },
  { src: "assets/images/products-flyer-3.webp", alt: "Игровые товары рекламной игры — листовка 3 из 4" },
  { src: "assets/images/products-flyer-4.webp", alt: "Игровые товары рекламной игры — листовка 4 из 4" },
];

const faqItems = [
  {
    "question": "Кто может принять участие в рекламной игре?",
    "answer": "<p>К участию в Рекламной игре приглашаются все граждане Республики Беларусь, а также иностранные граждане и лица без гражданства, являющиеся держателями Карты/Электронной карты Участника и зарегистрированные в личном кабинете на Интернет-сайте <a href=\"https://vigoda.by\">vigoda.by</a>, заполнившие в нем достоверные актуальные персональные данные.</p>"
  },
  {
    "question": "Когда проходит Рекламная игра?",
    "answer": "<p>Стать участником Рекламной игры можно в период с <strong>21 сентября по 15 ноября 2026 года</strong> включительно.</p>"
  },
  {
    "question": "Как стать участником Рекламной игры?",
    "answer": "<p>Для участия в Рекламной игре, в период с 00:00:00 <strong>21.09.2026</strong> по 23:59:59 <strong>15.11.2026</strong> (включительно), необходимо выполнить следующие условия:</p><ol><li>Зарегистрировать бонусную Карту «Выгода» на Интернет-сайте <a href=\"https://vigoda.by\">vigoda.by</a> или в Мобильном приложении.</li><li>Проверить корректность заполнения своих персональных данных и подтвердить согласие на участие в Рекламной игре в личном кабинете.</li><li>В период с 21 сентября 2026 года по 15 ноября 2026 года приобрести в магазинах «АЛМИ» и (или) «ZAKRAMA», на территории Республики Беларусь Игровые продукты на сумму не менее 2 (Двух) белорусских рублей в одном чеке, применив при расчёте Карту «Выгода».</li></ol>"
  },
  {
    "question": "Сколько раз я могу принять участие в рекламной игре?",
    "answer": "<p>Каждый Участник может принимать участие в Рекламной игре неограниченное количество раз при условии выполнения всех условий и требований Правил.</p>"
  },
  {
    "question": "Как присваивается игровой код?",
    "answer": "<p>При покупке Игровых продуктов с использованием Карты «Выгода» за каждые <strong>2,00 белорусских рубля</strong> стоимости Игровых продуктов в одном кассовом чеке Участнику автоматически присваивается <strong>1 Игровой код</strong>. Если стоимость Игровых продуктов в чеке составляет менее 2,00 BYN, Игровой код не присваивается.</p>"
  },
  {
    "question": "Какие товары необходимо купить для участия в рекламной игре?",
    "answer": "<p>Список товаров, участвующих в Рекламной игре, указан <a href=\"assets/docs/game-products.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">здесь</a>.</p>"
  },
  {
    "question": "Нужно ли мне сохранять чек?",
    "answer": "<p>Нет. Правила Рекламной игры не содержат требования о необходимости сохранения кассового чека для участия в игре или получения приза. Игровые коды присваиваются автоматически при совершении покупки Игровых продуктов с использованием Карты «Выгода».</p>"
  },
  {
    "question": "Какие призы разыгрываются?",
    "answer": "<p>В рамках Рекламной игры разыгрываются:</p><ul><li><strong>Главный приз — 25 000 BYN;</strong></li><li><strong>200</strong> электронных подарочных карт «АЛМИ» номиналом 100 белорусских рублей;</li><li><strong>12</strong> кухонных комбайнов RAGEX R101, цвет 600 (красный);</li><li><strong>12</strong> аэрогрилей TEFAL EY505D15;</li><li><strong>12</strong> смартфонов Apple iPhone 17 Pro 256GB, цвет «космический оранжевый».</li></ul><p>Для призов, в отношении которых возникает обязанность по уплате подоходного налога, призовым фондом также предусмотрены дополнительные денежные средства для его возмещения.</p>"
  },
  {
    "question": "Когда проходит розыгрыш призов?",
    "answer": "<p>В рамках Рекламной игры предусмотрено <strong>5 розыгрышей</strong>:</p><ul><li><strong>07.10.2026 в 15:00;</strong></li><li><strong>21.10.2026 в 15:00;</strong></li><li><strong>04.11.2026 в 15:00;</strong></li><li><strong>18.11.2026 в 15:00;</strong></li><li><strong>19.11.2026 в 12:00</strong> — розыгрыш Главного приза.</li></ul>"
  },
  {
    "question": "Как узнать о результатах розыгрыша?",
    "answer": "<p>Списки победителей будут размещены на Интернет-сайте <a href=\"https://igra.almi.by\">igra.almi.by</a>, а результаты Рекламной игры будут опубликованы в газете «Рэспубліка» в срок до 18 января 2027 года.</p><p>Победители Рекламной игры уведомляются Организатором.</p>"
  },
  {
    "question": "Где и когда можно получить приз?",
    "answer": "<p>Приз №1 размещается для скачивания в Личном кабинете Участника на Интернет-сайте и в Мобильном приложении в течение <strong>8 рабочих дней с даты розыгрыша</strong>. Использовать подарочную карту необходимо в течение 90 дней с даты проведения соответствующего розыгрыша.</p><p>Приз №2, №3, №4 и Главный приз можно получить в течение месяца со дня признания Участника победителем по адресу Организатора: г. Минск, ул. Интернациональная, д. 25а, офис 502. Дату и время получения необходимо предварительно согласовать с Организатором по телефону <a href=\"tel:+375296585050\">+375 (29) 658-50-50</a>.</p>"
  }
];

const rulesContainer = document.querySelector("[data-rules]");
rules.forEach((rule, index) => {
  const article = document.createElement("article");
  article.className = "rule-card";
  article.innerHTML = `<p>${index + 1}. ${rule}</p>`;
  if (index === rules.length - 1) {
    const link = document.createElement("a");
    link.className = "secondary-button";
    link.href = "assets/docs/rules.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Полные правила";
    article.append(link);
  }
  rulesContainer.append(article);
});

const prizeTrack = document.querySelector("[data-prize-track]");
const prizeStatus = document.querySelector("[data-prize-status]");
let currentPrize = 0;

prizes.forEach((prize, index) => {
  const article = document.createElement("article");
  article.className = `prize-card${index === 0 ? " is-current" : ""}`;
  article.setAttribute("aria-roledescription", "слайд");
  article.setAttribute("aria-label", `${index + 1} из ${prizes.length}`);
  const art = prize.composite
    ? `<img class="prize-card__composite" src="${prize.image}" alt="${prize.alt}" width="826" height="647" loading="lazy" decoding="async">`
    : `
      <img class="prize-card__bg" src="assets/images/prize-card-bg.avif" alt="">
      <img class="prize-card__product" src="${prize.image}" alt="${prize.alt}">
      <img class="prize-card__quantity" src="${prize.badge}" alt="Количество призов: ${prize.quantity}">
    `;
  article.innerHTML = `
    <div class="prize-card__art">
      ${art}
    </div>
    <h3>${prize.title}</h3>
  `;
  prizeTrack.append(article);
});

function renderCurrentPrize() {
  const cards = [...prizeTrack.children];
  cards.forEach((card, index) => card.classList.toggle("is-current", index === currentPrize));
  prizeStatus.textContent = `${currentPrize + 1} из ${prizes.length}: ${cards[currentPrize].textContent.trim()}`;
}

document.querySelector("[data-prize-prev]").addEventListener("click", () => {
  currentPrize = (currentPrize - 1 + prizes.length) % prizes.length;
  renderCurrentPrize();
});

document.querySelector("[data-prize-next]").addEventListener("click", () => {
  currentPrize = (currentPrize + 1) % prizes.length;
  renderCurrentPrize();
});

const stagesContainer = document.querySelector("[data-stages]");
stages.forEach((stage) => {
  const article = document.createElement("article");
  article.className = "stage";
  const marker = stage.marker === "star"
    ? '<img src="assets/icons/star.svg" alt="Финальный этап" width="30" height="30">'
    : stage.marker;
  article.innerHTML = `
    <div class="stage__marker">${marker}</div>
    <p class="stage__dates"><span>${stage.from}</span><span>${stage.to}</span></p>
    <p class="stage__draw"><span>${stage.label}</span><span>${stage.draw}</span></p>
  `;
  stagesContainer.append(article);
});

const productsTrack = document.querySelector("[data-products-track]");
const productsStatus = document.querySelector("[data-products-status]");
let currentProduct = 0;

productSlides.forEach((slide, index) => {
  const article = document.createElement("article");
  article.className = "product-slide";
  article.setAttribute("aria-roledescription", "слайд");
  article.setAttribute("aria-label", `${index + 1} из ${productSlides.length}`);
  article.innerHTML = `<button type="button" aria-label="Открыть ${slide.alt.toLowerCase()}" data-product-open="${index}"><img src="${slide.src}" alt="${slide.alt}" width="1600" height="2237" loading="lazy" decoding="async"></button>`;
  productsTrack.append(article);
});

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

document.querySelector("[data-products-prev]").addEventListener("click", () => {
  const maxIndex = Math.max(0, productSlides.length - productsPerView());
  currentProduct = currentProduct <= 0 ? maxIndex : currentProduct - 1;
  renderProducts();
});

document.querySelector("[data-products-next]").addEventListener("click", () => {
  const maxIndex = Math.max(0, productSlides.length - productsPerView());
  currentProduct = currentProduct >= maxIndex ? 0 : currentProduct + 1;
  renderProducts();
});

window.addEventListener("resize", renderProducts);
window.addEventListener("load", renderProducts);

const faqContainer = document.querySelector("[data-faq]");
faqItems.forEach((item, index) => {
  const article = document.createElement("article");
  const isOpen = index === 0;
  article.className = `faq-item${isOpen ? " is-open" : ""}`;
  article.innerHTML = `
    <h3>
      <button class="faq-question" type="button" aria-expanded="${isOpen}" aria-controls="faq-answer-${index}" id="faq-question-${index}">
        <span>${item.question}</span>
        <img src="assets/icons/${isOpen ? "caret-up" : "caret-down"}.svg" alt="" width="21" height="21">
      </button>
    </h3>
    <div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}">
      <div class="faq-answer__inner">
        ${item.answer}
      </div>
    </div>
  `;
  faqContainer.append(article);
});

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

function closeMenu() {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  menuOpenButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  focusBeforeMenu?.focus();
}

menuOpenButton.addEventListener("click", openMenu);
menuCloseButton.addEventListener("click", closeMenu);
menu.querySelectorAll("[data-menu-link]").forEach((link) => link.addEventListener("click", closeMenu));
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

const sections = navigationItems
  .map((item) => document.getElementById(item.id))
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

document.querySelector("[data-products-track]").addEventListener("click", (event) => {
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

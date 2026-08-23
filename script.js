const TELEGRAM_URL = "https://t.me/testaletheia_academy_bot?start=diag";

document.querySelectorAll("[data-telegram]").forEach((link) => {
  link.href = TELEGRAM_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const levelCards = [...document.querySelectorAll("[data-level-card]")];
const levelNodes = [...document.querySelectorAll("[data-level-node]")];
const levelMap = document.querySelector(".level-map");

function setLevel(index, open = true) {
  levelCards.forEach((card, cardIndex) => {
    const isOpen = open && cardIndex === index;
    const toggle = card.querySelector(".level-card__toggle");
    const action = card.querySelector(".level-card__action");

    card.classList.toggle("is-open", isOpen);
    toggle?.setAttribute("aria-expanded", String(isOpen));
    if (action) action.textContent = isOpen ? "Свернуть ↑" : "Читать дальше ↓";
  });

  levelNodes.forEach((node, nodeIndex) => {
    const isActive = nodeIndex === index;
    node.classList.toggle("is-active", isActive);
    node.setAttribute("aria-pressed", String(isActive));
  });

  if (levelMap) levelMap.dataset.activeLevel = String(index);
}

levelCards.forEach((card, index) => {
  const toggle = card.querySelector(".level-card__toggle");
  toggle?.addEventListener("click", () => {
    setLevel(index, !card.classList.contains("is-open"));
  });
});

levelNodes.forEach((node, index) => {
  node.addEventListener("click", () => {
    setLevel(index, true);
    const card = levelCards[index];
    if (!card) return;

    const top = card.getBoundingClientRect().top;
    if (top < 16 || top > window.innerHeight - 80) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

const benefitItems = [...document.querySelectorAll(".benefit-item")];

benefitItems.forEach((item) => {
  const toggle = item.querySelector(".benefit-toggle");
  const action = toggle?.querySelector("small");

  toggle?.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("is-open");

    benefitItems.forEach((otherItem) => {
      const otherToggle = otherItem.querySelector(".benefit-toggle");
      const otherAction = otherToggle?.querySelector("small");
      otherItem.classList.remove("is-open");
      otherToggle?.setAttribute("aria-expanded", "false");
      if (otherAction) otherAction.textContent = "Подробнее ↓";
    });

    if (shouldOpen) {
      item.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (action) action.textContent = "Свернуть ↑";
    }
  });
});

document.querySelector(`.hero__visual`)?.setAttribute(`role`, `group`);
document.querySelector(`.level-map`)?.setAttribute(`role`, `group`);

const audienceItems = [...document.querySelectorAll(".audience-item")];

audienceItems.forEach((item) => {
  const toggle = item.querySelector(".audience-toggle");
  const action = toggle?.querySelector("small");

  toggle?.addEventListener("click", () => {
    const shouldOpen = !item.classList.contains("is-open");
    audienceItems.forEach((otherItem) => {
      const otherToggle = otherItem.querySelector(".audience-toggle");
      const otherAction = otherToggle?.querySelector("small");
      otherItem.classList.remove("is-open");
      otherToggle?.setAttribute("aria-expanded", "false");
      if (otherAction) otherAction.textContent = "Подробнее ↓";
    });
    if (shouldOpen) {
      item.classList.add("is-open");
      toggle?.setAttribute("aria-expanded", "true");
      if (action) action.textContent = "Свернуть ↑";
    }
  });
});
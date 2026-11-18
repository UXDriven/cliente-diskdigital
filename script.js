(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const whatsappNumber = "5581998839561";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menuButton = $("#menu-toggle");
  const mobileMenu = $("#mobile-menu");
  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    mobileMenu.classList.remove("is-open");
    mobileMenu.inert = true;
  }
  function toggleMenu() {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Fechar menu" : "Abrir menu");
    mobileMenu.inert = !opening;
    mobileMenu.classList.toggle("is-open", opening);
  }
  menuButton?.addEventListener("click", toggleMenu);
  $$("#mobile-menu a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (mobileMenu?.classList.contains("is-open") && !event.target.closest(".site-header")) closeMenu();
  });
  window.matchMedia("(min-width: 921px)").addEventListener?.("change", event => {
    if (event.matches) closeMenu();
  });

  const filters = $$(".filter-button");
  const products = $$(".product-card");
  const catalogCount = $("#catalog-count");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      let visible = 0;
      products.forEach(card => {
        const show = selected === "todos" || card.dataset.categories.split(" ").includes(selected);
        card.hidden = !show;
        if (show) visible++;
      });
      if (catalogCount) catalogCount.textContent = String(visible).padStart(2, "0");
    });
  });

  const quoteForm = $("#quote-form");
  const quoteProduct = $("#quote-product");
  $$(".product-action").forEach(button => {
    button.addEventListener("click", () => {
      if (quoteProduct) quoteProduct.value = button.dataset.product || "";
      $("#orcamento")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => quoteProduct?.focus({ preventScroll: true }), reducedMotion ? 0 : 650);
    });
  });

  quoteForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const name = String(data.get("nome") || "").trim();
    const product = String(data.get("produto") || "").trim();
    const amount = String(data.get("quantidade") || "").trim();
    const deadline = String(data.get("prazo") || "A combinar").trim();
    const details = String(data.get("detalhes") || "").trim();
    const message = [
      "Olá! Vim pelo site da Disk Digital e gostaria de solicitar um orçamento.",
      "",
      name ? `*Meu nome:* ${name}` : null,
      `*Produto:* ${product}`,
      amount ? `*Quantidade:* ${amount}` : null,
      `*Prazo desejado:* ${deadline}`,
      details ? `*Detalhes:* ${details}` : null,
      "",
      "Podem me orientar sobre disponibilidade e valores?"
    ].filter(line => line !== null).join("\n");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    // Use same-tab navigation so mobile browsers do not block the handoff.
    window.location.assign(url);
  });

  // Reveal elements when they enter view; they remain visible afterward.
  const revealElements = $$(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    revealElements.forEach(element => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: "0px 0px -24px 0px" });
    revealElements.forEach(element => revealObserver.observe(element));
  }

  // Keep only one FAQ expanded at a time.
  const faqs = $$(".faq-items details");
  faqs.forEach(item => item.addEventListener("toggle", () => {
    if (item.open) faqs.forEach(other => {
      if (other !== item) other.open = false;
    });
  }));

  // Subtle reading progress.
  const progress = $("#reading-progress");
  let scheduled = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + "%";
    scheduled = false;
  }
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  // Year stays current without redeploying.
  const year = $("#current-year");
  if (year) year.textContent = new Date().getFullYear();
})();

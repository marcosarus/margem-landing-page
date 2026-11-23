
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // CONFIGURAÇÃO DO CHECKOUT
  // =====================================

  // Inseriremos aqui o link real da Kiwify após configurar o produto.
  const CHECKOUT_URL = "https://pay.kiwify.com.br/O0yE7UR";

  const checkoutLinks = document.querySelectorAll(".checkout-link");

  checkoutLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

      if (!CHECKOUT_URL.trim()) {
        event.preventDefault();
        alert("O checkout ainda está sendo configurado. Em breve você poderá realizar sua compra.");
        return;
      }

      link.href = CHECKOUT_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  });


  // =====================================
  // MENU MOBILE
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {

    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // =====================================
  // FAQ INTERATIVO
  // =====================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");

        const otherQuestion = otherItem.querySelector(".faq-question");

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }
      });

      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }

    });

  });


  // =====================================
  // ANIMAÇÕES AO ROLAR A PÁGINA
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  // =====================================
  // ANO AUTOMÁTICO NO RODAPÉ
  // =====================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});

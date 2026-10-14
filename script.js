const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#current-year");
const billingOptions = document.querySelectorAll(".billing-option");
const prices = document.querySelectorAll(".price-value");
const billingCaptions = document.querySelectorAll(".billing-caption[aria-live]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (billingOptions.length && prices.length) {
  billingOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const billingPeriod = option.getAttribute("data-billing");

      if (billingPeriod !== "monthly" && billingPeriod !== "yearly") {
        throw new Error(`Unsupported pricing billing period: ${billingPeriod ?? "missing"}.`);
      }

      billingOptions.forEach((billingOption) => {
        const isSelected = billingOption === option;
        billingOption.classList.toggle("is-selected", isSelected);
        billingOption.setAttribute("aria-pressed", String(isSelected));
      });

      prices.forEach((price) => {
        const nextPrice = price.getAttribute(`data-${billingPeriod}`);

        if (nextPrice === null) {
          throw new Error(`Missing ${billingPeriod} price for a plan.`);
        }

        price.textContent = nextPrice;
      });

      billingCaptions.forEach((caption) => {
        caption.textContent = billingPeriod === "yearly" ? "Billed annually" : "Billed monthly";
      });
    });
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 620px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 620px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    }
  });
}

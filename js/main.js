function initMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const primaryNav = document.getElementById("primary-navigation");
  const dropdownToggles = document.querySelectorAll(".submenu-toggle");

  if (mobileMenu && primaryNav) {
    mobileMenu.addEventListener("click", () => {
      const isOpen = mobileMenu.getAttribute("aria-expanded") === "true";
      mobileMenu.setAttribute("aria-expanded", String(!isOpen));
      primaryNav.classList.toggle("open", !isOpen);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 960 && primaryNav.classList.contains("open")) {
          primaryNav.classList.remove("open");
          mobileMenu.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  dropdownToggles.forEach((toggle) => {
    const dropdown = toggle.closest(".dropdown");
    const menu = dropdown ? dropdown.querySelector(".dropdown-menu") : null;

    if (!menu) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open", !expanded);
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && primaryNav && mobileMenu) {
      primaryNav.classList.remove("open");
      mobileMenu.setAttribute("aria-expanded", "false");
      document.querySelectorAll(".dropdown-menu.open").forEach((menu) => {
        menu.classList.remove("open");
      });
      document.querySelectorAll(".submenu-toggle[aria-expanded='true']").forEach((toggle) => {
        toggle.setAttribute("aria-expanded", "false");
      });
    }
  });
}
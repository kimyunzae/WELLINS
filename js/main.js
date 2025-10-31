function initMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  const dropdowns = document.querySelectorAll(".dropdown > a");
  dropdowns.forEach(drop => {
    drop.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdownMenu = drop.nextElementSibling;
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let prefix = "";

  // Detect if current page is inside /pages/ (nested folder)
  if (window.location.pathname.includes("/pages/")) {
    // Count how deep you are after /pages/
    const afterPages = window.location.pathname.split("/pages/")[1];
    const depth = afterPages.split("/").length - 1;
    prefix = "../".repeat(depth + 1); // +1 to back out of /pages/
  }

  // Universal include function
  const include = (selector, file) => {
    fetch(prefix + file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then((html) => {
        const element = document.querySelector(selector);
        if (element) {
          element.innerHTML = html;

          // Normalize any root-relative links (src/href starting with "/") inside the included fragment
          // so they work from nested pages too.
          const rootFix = (attr) => {
            element.querySelectorAll(`[${attr}^='/']`).forEach((el) => {
              const val = el.getAttribute(attr);
              if (!val) return;
              el.setAttribute(attr, prefix + val.replace(/^\//, ""));
            });
          };
          rootFix("src");
          rootFix("href");
        }
        if (typeof initMenu === "function") initMenu();
      })
      .catch((err) => console.error("Include error:", err));
  };

  include("header", "components/navbar.html");
  include("footer", "components/footer.html");
});

(function () {
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".hamburger");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", nav.classList.contains("show"));
    });
  }

  // dropdown open/close
  document.querySelectorAll(".nav-item.has-dd > .nav-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = btn.closest(".nav-item");
      const isDropBtn = btn.dataset.dd === "true" || btn.getAttribute("href") === "#";
      if (!isDropBtn) return;

      e.preventDefault();
      parent.classList.toggle("open");

      document.querySelectorAll(".nav-item.open").forEach((x) => {
        if (x !== parent) x.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".nav-item.open").forEach((x) => x.classList.remove("open"));
    }
  });

  // active link highlight
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href && href === path) a.classList.add("active");
  });
})();

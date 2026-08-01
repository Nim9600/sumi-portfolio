/* =========================================================
   Sumith — Digital Newspaper Portfolio
   script.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("show");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
    });

    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("show");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      });
    });
  }

  /* ---------- Light / Dark theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");

  var saved = null;
  try { saved = localStorage.getItem("sumith-theme"); } catch (e) {}
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("sumith-theme", next); } catch (e) {}
    });
  }

  /* ---------- Hero headline auto-fit (no overflow, keeps 2 lines) ---------- */
  var heroTitle = document.querySelector(".hero__title");

  function fitHero() {
    if (!heroTitle) return;
    var container = heroTitle.parentElement;      // .hero
    var avail = container.clientWidth;            // exact width inside padding
    if (!avail) return;

    // Split the authored lines on the <br>
    var lines = heroTitle.innerHTML.split(/<br\s*\/?>/i);

    // Hidden measurer that mirrors the title's font settings
    var probe = document.createElement("span");
    var cs = window.getComputedStyle(heroTitle);
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.whiteSpace = "nowrap";
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.letterSpacing = cs.letterSpacing;
    probe.style.fontSize = "100px";               // reference size
    document.body.appendChild(probe);

    // Find the widest line at the reference size
    var widest = 0;
    lines.forEach(function (ln) {
      probe.innerHTML = ln.trim();
      if (probe.offsetWidth > widest) widest = probe.offsetWidth;
    });
    document.body.removeChild(probe);
    if (!widest) return;

    // Scale so the widest line fills the available width exactly
    var size = (avail / widest) * 100;

    // Clamp to sensible bounds so it never gets absurd
    var min = 26, max = 96;
    size = Math.max(min, Math.min(max, size));
    heroTitle.style.fontSize = size + "px";
  }

  fitHero();
  window.addEventListener("resize", fitHero);
  // Re-fit once web fonts have loaded (metrics change)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitHero);
  } else {
    window.addEventListener("load", fitHero);
  }

  /* ---------- Subtle reveal-on-scroll ---------- */
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".col, .project, .fcol, .hero__title, .section-title"
    );
    targets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { io.observe(el); });
  }
})();

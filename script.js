/* =========================================================
   Sumith — Digital Newspaper Portfolio
   script.js  (shared: home + about)
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
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("sumith-theme", next); } catch (e) {}
    });
  }

  /* ---------- Hero headline auto-fit (home only) ---------- */
  var heroTitle = document.querySelector(".hero__title");
  function fitHero() {
    if (!heroTitle) return;
    var avail = heroTitle.parentElement.clientWidth - 6; // small safety buffer
    if (avail <= 0) return;
    var lines = heroTitle.innerHTML.split(/<br\s*\/?>/i);
    var probe = document.createElement("span");
    var cs = window.getComputedStyle(heroTitle);
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font-size:100px;" +
      "font-family:" + cs.fontFamily + ";font-weight:" + cs.fontWeight + ";letter-spacing:" + cs.letterSpacing + ";";
    document.body.appendChild(probe);
    var widest = 0;
    lines.forEach(function (ln) { probe.innerHTML = ln.trim(); if (probe.offsetWidth > widest) widest = probe.offsetWidth; });
    document.body.removeChild(probe);
    if (!widest) return;
    var size = Math.max(24, Math.min(92, (avail / widest) * 100));
    heroTitle.style.fontSize = size + "px";
  }
  if (heroTitle) {
    fitHero();
    window.addEventListener("resize", fitHero);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
    else window.addEventListener("load", fitHero);
  }

  /* ---------- Subtle reveal-on-scroll ---------- */
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".col, .project, .fcol, .hero__title, .section-title, .about-hero, .sec, .quote-block"
    );
    targets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();

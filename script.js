/* =========================================================
   Sumith — Digital Newspaper Portfolio
   script.js  (shared: home + about + projects)
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
    var avail = heroTitle.parentElement.clientWidth - 6;
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

  /* ---------- Projects category filter (projects page only) ---------- */
  var catTabs = document.getElementById("catTabs");
  var catSelect = document.getElementById("catSelect");
  var projGrid = document.getElementById("projGrid");
  if (projGrid) {
    var cards = Array.prototype.slice.call(projGrid.querySelectorAll(".pcard"));

    function applyFilter(cat) {
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cats") || "").split(/\s+/);
        var show = (cat === "all") || cats.indexOf(cat) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    }

    function setActiveTab(cat) {
      if (!catTabs) return;
      catTabs.querySelectorAll(".cat-tab").forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-cat") === cat);
      });
    }

    // Tabs
    if (catTabs) {
      catTabs.addEventListener("click", function (e) {
        var btn = e.target.closest(".cat-tab");
        if (!btn) return;
        var cat = btn.getAttribute("data-cat");
        setActiveTab(cat);
        if (catSelect) catSelect.value = cat;
        applyFilter(cat);
      });
    }

    // Dropdown (keeps tabs in sync)
    if (catSelect) {
      catSelect.addEventListener("change", function () {
        var cat = catSelect.value;
        setActiveTab(cat);
        applyFilter(cat);
      });
    }
  }

  /* ---------- Subtle reveal-on-scroll ---------- */
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".col, .project, .fcol, .hero__title, .section-title, .about-hero, .sec, .quote-block, .pcard, .cta"
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

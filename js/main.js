/* =================================================================
   Ganna Asker — Portfolio interactions
   - mobile nav toggle
   - active section highlighting (scroll-spy)
   - scroll-reveal for content blocks
   - DNA rail fill = reading progress
   - footer year
   ================================================================= */

(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  /* ---------- Mobile nav toggle ---------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Active section highlighting ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchorByHash = {};
  document.querySelectorAll(".nav-links a[href^='#']").forEach(function (a) {
    navAnchorByHash[a.getAttribute("href")] = a;
  });

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navAnchorByHash["#" + entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.values(navAnchorByHash).forEach(function (l) {
              l.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }


  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
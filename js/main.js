/* ============================================================
   OG CYCLING CREW — main.js
   Vanilla JS. No dependencies, no build step.
   Everything runs client-side → 100% GitHub Pages friendly.
   ============================================================ */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const backdrop = document.getElementById("navBackdrop");
  const body = document.body;

  /* ---------- Sticky header background on scroll ---------- */
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const closeNav = () => {
    body.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Active nav link based on section in view ---------- */
  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Photo strip ----------
     - Only animate while on screen (saves CPU/battery).
     - Photos further along the strip carry data-src, so nothing beyond the first few
       is fetched with the page itself. Once the visitor gets close to the section:
       1. photos about to slide in are loaded right away (priority), and
       2. all remaining photos are preloaded in the background, 3 at a time,
          so they're already cached by the time they come round. */
  const strip = document.querySelector(".photo-strip");
  if (strip && "IntersectionObserver" in window) {
    const loadImg = (img) => {
      if (!img.dataset.src) return;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    };
    // Same file appears twice per row (seamless loop) → set every copy at once.
    const loadUrl = (url) =>
      strip.querySelectorAll(`img[data-src="${url}"]`).forEach(loadImg);

    const preloadRest = () => {
      const queue = [...new Set(
        Array.from(strip.querySelectorAll("img[data-src]"), (img) => img.dataset.src)
      )];
      const next = () => {
        const url = queue.shift();
        if (!url) return;
        const pre = new Image();
        pre.onload = pre.onerror = () => { loadUrl(url); next(); };
        pre.src = url;
      };
      for (let i = 0; i < 3; i++) next();
    };

    let feeding = false;
    const startFeeding = () => {
      feeding = true;
      strip.querySelectorAll(".photo-strip__row").forEach((row) => {
        const feeder = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) { loadUrl(entry.target.dataset.src); feeder.unobserve(entry.target); }
            });
          },
          { root: row, rootMargin: "0px 100%" } // one full row-width ahead on each side
        );
        row.querySelectorAll("img[data-src]").forEach((img) => feeder.observe(img));
      });
      // background preload never competes with the page's own first load
      if (document.readyState === "complete") preloadRest();
      else window.addEventListener("load", preloadRest, { once: true });
    };

    // Start fetching well before the section is reached …
    new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !feeding) startFeeding();
      },
      { rootMargin: "1200px 0px" }
    ).observe(strip);
    // … but only animate while it's (nearly) on screen.
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => strip.classList.toggle("is-paused", !entry.isIntersecting));
      },
      { rootMargin: "300px 0px" }
    ).observe(strip);
  } else if (strip) {
    strip.querySelectorAll("img[data-src]").forEach((img) => { img.src = img.dataset.src; });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

// Scroll-driven parallax and reveal animations for index-animated.html.
// Content itself is rendered by js/main.js from content.js — this file only
// adds motion on top of that already-rendered DOM.
//
// Falls back to a static (non-animated) page if GSAP failed to load, or if
// the visitor's OS has "reduce motion" turned on.

(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsapAvailable = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (prefersReducedMotion || !gsapAvailable) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // --- Coordinated hero parallax: each decorative layer drifts at its own
  // speed (data-speed) as the hero scrolls past, while the text content
  // itself drifts up and fades slightly faster than the background. ---
  document.querySelectorAll(".hero [data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    gsap.to(el, {
      yPercent: -60 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.to("#hero-parallax-content", {
    yPercent: -18,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".scroll-hint", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "15% top",
      scrub: true,
    },
  });

  // --- Section reveals: fade + slide up as each element enters view. ---
  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      delay: (i % 3) * 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // --- Timeline: alternating left/right slide-in, staggered by scroll
  // position (each item triggers independently as it reaches the viewport).
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.from(item, {
      x: i % 2 === 0 ? -36 : 36,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // --- Gallery: staggered scale-fade as the grid comes into view. ---
  const galleryCards = gsap.utils.toArray(".gallery-card");
  if (galleryCards.length) {
    gsap.from(galleryCards, {
      y: 26,
      opacity: 0,
      scale: 0.96,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 85%",
      },
    });
  }
})();

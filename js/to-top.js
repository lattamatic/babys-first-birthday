// "Back to top" button: appears once the visitor has scrolled past the first screen.
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "to-top";
  button.hidden = true;
  button.setAttribute("aria-label", "Back to top");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" ' +
    'stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M5 12l7-7 7 7"/></svg>';
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  document.body.appendChild(button);

  // An invisible block covering the top of the page: once it scrolls out of view, show the button.
  const sentinel = document.createElement("div");
  sentinel.className = "to-top-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    button.hidden = entry.isIntersecting;
  }).observe(sentinel);
})();

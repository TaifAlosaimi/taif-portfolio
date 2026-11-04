(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("current-year");
    if (year) year.textContent = new Date().getFullYear();

    const revealTargets = () => {
      const targets = document.querySelectorAll(".reveal:not(.is-visible)");
      if (!("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"));
        return;
      }
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      targets.forEach((target) => observer.observe(target));
    };

    revealTargets();
    document.addEventListener("portfolio:projectsrendered", revealTargets);

    const header = document.querySelector(".site-header");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const video = document.querySelector(".hero-video");
    if (video) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Poster remains visible if autoplay is blocked by the browser.
        });
      }
    }
  });
})();

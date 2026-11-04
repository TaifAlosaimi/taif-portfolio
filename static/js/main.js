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

    const sectionMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (sectionMotion && "IntersectionObserver" in window) {
      document.documentElement.classList.add("has-section-motion");
      const sections = document.querySelectorAll(".section-shell");
      const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
      sections.forEach((section) => sectionObserver.observe(section));
    }

    /* Tracks number count-up — requested exception */
    const tracksNumber = document.querySelector(".tracks-number");
    const tracksSection = document.querySelector(".tracks-section");
    if (tracksNumber && tracksSection) {
      const finalCount = 4;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let counterStarted = false;

      const runTracksCounter = () => {
        if (counterStarted) return;
        counterStarted = true;

        if (reducedMotion) {
          tracksNumber.textContent = "04";
          return;
        }

        const duration = 1350;
        const startTime = performance.now();
        tracksNumber.textContent = "01";
        tracksNumber.classList.add("is-counting");

        const updateCounter = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.min(finalCount, 1 + Math.floor(easedProgress * (finalCount - 1)));
          tracksNumber.textContent = String(currentCount).padStart(2, "0");

          if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
          } else {
            tracksNumber.textContent = "04";
          }
        };

        window.requestAnimationFrame(updateCounter);
      };

      if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            runTracksCounter();
            observer.disconnect();
          }
        }, { threshold: 0.35 });
        counterObserver.observe(tracksSection);
      } else {
        runTracksCounter();
      }
    }

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

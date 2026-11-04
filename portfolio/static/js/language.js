(() => {
  const COOKIE_NAME = "django_language";
  const COOKIE_DAYS = 365;

  function readLanguageCookie() {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : "en";
  }

  function saveLanguage(language) {
    const maxAge = COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `${COOKIE_NAME}=${language}; max-age=${maxAge}; path=/; SameSite=Lax`;
  }

  function applyLanguage(language) {
    const lang = language === "ar" ? "ar" : "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("is-arabic", lang === "ar");

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      const value = element.dataset[lang];
      if (value !== undefined) element.textContent = value;
    });

    const toggle = document.querySelector(".language-toggle");
    if (toggle) {
      toggle.querySelectorAll("span").forEach((span) => {
        span.classList.toggle("is-active", span.textContent.trim().toLowerCase() === lang);
      });
      toggle.setAttribute("aria-label", lang === "en" ? "Switch to Arabic" : "Switch to English");
    }
    document.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail: { language: lang } }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(readLanguageCookie());
    const toggle = document.querySelector(".language-toggle");
    toggle?.addEventListener("click", () => {
      const next = document.documentElement.lang === "en" ? "ar" : "en";
      saveLanguage(next);
      applyLanguage(next);
    });
  });
})();

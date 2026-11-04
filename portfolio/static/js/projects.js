(() => {
  const API_URL = "/api/projects/";
  const list = document.getElementById("project-list");

  const copy = {
    en: { loading: "Loading projects…", empty: "Projects will appear here once they are added through the admin dashboard.", error: "Projects could not be loaded. Please try again later.", image: "Project image" },
    ar: { loading: "جارٍ تحميل المشاريع…", empty: "ستظهر المشاريع هنا بعد إضافتها من لوحة الإدارة.", error: "تعذّر تحميل المشاريع حاليًا. حاولي مرة أخرى لاحقًا.", image: "صورة المشروع" }
  };

  function currentLanguage() {
    return document.documentElement.lang === "ar" ? "ar" : "en";
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderProjects(projects) {
    if (!list) return;
    list.replaceChildren();

    if (!projects.length) {
      list.append(make("p", "projects-empty", copy[currentLanguage()].empty));
      return;
    }

    projects.forEach((project, index) => {
      const lang = currentLanguage();
      const article = make("article", `project-entry reveal ${index % 2 ? "project-entry-reverse" : ""}`);
      article.dataset.projectId = String(project.id);

      const marker = make("div", "timeline-marker");
      marker.append(make("span", "", String(index + 1).padStart(2, "0")));
      const content = make("div", "project-content");
      const meta = make("div", "project-meta");
      meta.append(make("span", "", `PROJECT ${String(index + 1).padStart(2, "0")}`));
      meta.append(make("span", "", String(project.display_order).padStart(2, "0")));
      const title = make("h3", "project-title", project[`title_${lang}`] || project.title_en || "");
      const description = make("p", "project-description", project[`description_${lang}`] || project.description_en || "");
      const images = make("div", "project-images");

      [project.image_one, project.image_two].forEach((imagePath, imageIndex) => {
        if (!imagePath) return;
        const frame = make("figure", `project-image-frame project-image-${imageIndex + 1}`);
        const image = document.createElement("img");
        image.src = imagePath.startsWith("http") ? imagePath : `/media/${imagePath.replace(/^\/?media\//, "")}`;
        image.alt = `${copy[lang].image} ${imageIndex + 1}: ${project[`title_${lang}`] || project.title_en || ""}`;
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => frame.classList.add("image-unavailable"), { once: true });
        frame.append(image);
        images.append(frame);
      });

      content.append(meta, title, description, images);
      article.append(marker, content);
      list.append(article);
    });

    document.dispatchEvent(new CustomEvent("portfolio:projectsrendered"));
  }

  async function loadProjects() {
    if (!list) return;
    list.replaceChildren(make("p", "projects-loading", copy[currentLanguage()].loading));
    try {
      const response = await fetch(API_URL, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`API responded with ${response.status}`);
      const payload = await response.json();
      const projects = Array.isArray(payload) ? payload : (payload.results || []);
      renderProjects(projects);
    } catch (error) {
      console.error("Portfolio projects API error:", error);
      list.replaceChildren(make("p", "projects-error", copy[currentLanguage()].error));
    }
  }

  document.addEventListener("DOMContentLoaded", loadProjects);
  document.addEventListener("portfolio:languagechange", () => {
    if (list?.querySelector(".project-entry")) {
      loadProjects();
    } else if (list?.querySelector(".projects-empty")) {
      list.replaceChildren(make("p", "projects-empty", copy[currentLanguage()].empty));
    } else if (list?.querySelector(".projects-error")) {
      list.replaceChildren(make("p", "projects-error", copy[currentLanguage()].error));
    }
  });
})();

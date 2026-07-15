// ── Mobile menu ───────────────────────────────────────────────
const menuToggle = document.querySelector(".menu-toggle");
const navShell = document.querySelector(".nav-shell");

if (menuToggle && navShell) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navShell.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ── Settings dropdown ─────────────────────────────────────────
const settingsBtn = document.querySelector(".settings-btn");
const settingsDrop = document.getElementById("settings-dropdown");

if (settingsBtn && settingsDrop) {
  settingsBtn.addEventListener("click", e => {
    e.stopPropagation();
    const opening = settingsDrop.hidden;
    settingsDrop.hidden = !opening;
    settingsBtn.setAttribute("aria-expanded", String(opening));
  });

  document.addEventListener("click", e => {
    if (!settingsDrop.contains(e.target) && e.target !== settingsBtn) {
      settingsDrop.hidden = true;
      settingsBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !settingsDrop.hidden) {
      settingsDrop.hidden = true;
      settingsBtn.setAttribute("aria-expanded", "false");
      settingsBtn.focus();
    }
  });
}

// ── Theme ─────────────────────────────────────────────────────
const THEME_KEY = "knf-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll("[data-theme-val]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeVal === theme);
  });
}

document.querySelectorAll("[data-theme-val]").forEach(btn => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.themeVal));
});

applyTheme(localStorage.getItem(THEME_KEY) || "light");

// ── Language ──────────────────────────────────────────────────
const LANG_KEY = "knf-lang";

function applyLang(lang) {
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.en;
  });
  document.querySelectorAll("[data-lang-val]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.langVal === lang);
  });
}

document.querySelectorAll("[data-lang-val]").forEach(btn => {
  btn.addEventListener("click", () => applyLang(btn.dataset.langVal));
});

applyLang(localStorage.getItem(LANG_KEY) || "en");

// ── Active nav on scroll ──────────────────────────────────────
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sectionIds = Array.from(navLinks).map(l => l.dataset.section);
const trackedSections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

if (trackedSections.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px" });

  trackedSections.forEach(s => navObserver.observe(s));
}

// ── Scroll reveal ─────────────────────────────────────────────
(function () {
  const staggerSelectors = [
    ".project-entry",
    ".fs-card",
    ".fs-stat",
    ".gallery-item",
  ];
  const singleSelectors = [
    ".gallery-filters",
    ".team-row",
  ];

  staggerSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 5) * 0.09 + "s";
    });
  });

  singleSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add("reveal"));
  });

  const all = document.querySelectorAll(".reveal");
  if (!all.length) return;

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -40px 0px", threshold: 0.06 });

  all.forEach(el => revealObs.observe(el));
})();

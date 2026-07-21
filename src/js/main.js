// ── Mobile menu ───────────────────────────────────────────────
const menuToggle = document.querySelector(".menu-toggle");
const navShell = document.querySelector(".nav-shell");

if (menuToggle && navShell) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navShell.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the mobile menu after tapping a nav link (incl. in-page anchors)
  navShell.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navShell.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
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
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0e1117" : "#f2f0ec");
  document.querySelectorAll("[data-theme-val]").forEach(btn => {
    const on = btn.dataset.themeVal === theme;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
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
    const val = el.dataset[lang] || el.dataset.en;
    // <meta> has no visible text — localize its content attribute instead
    if (el.tagName === "META") el.setAttribute("content", val);
    else el.textContent = val;
  });
  document.querySelectorAll("[data-lang-val]").forEach(btn => {
    const on = btn.dataset.langVal === lang;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
  });
}

document.querySelectorAll("[data-lang-val]").forEach(btn => {
  btn.addEventListener("click", () => applyLang(btn.dataset.langVal));
});

applyLang(localStorage.getItem(LANG_KEY) || "en");

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

  // Fallback: if IntersectionObserver is unavailable, reveal everything now
  if (!("IntersectionObserver" in window)) {
    all.forEach(el => el.classList.add("visible"));
    return;
  }

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

// ── Copy-to-clipboard buttons ─────────────────────────────────
document.querySelectorAll(".contact-copy").forEach(btn => {
  const feedback = btn.querySelector(".copy-feedback");
  let timer;

  btn.addEventListener("click", async () => {
    const text = btn.dataset.copyEmail || "";
    let ok = false;

    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (e) {
      // Fallback for insecure contexts / older browsers
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (e2) {
        ok = false;
      }
    }

    if (!feedback) return;
    const lang = document.documentElement.getAttribute("lang") || "en";
    feedback.textContent = ok
      ? (lang === "pl" ? "Skopiowano!" : "Copied!")
      : (lang === "pl" ? "Skopiuj ręcznie" : "Copy manually");
    feedback.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => feedback.classList.remove("show"), 1900);
  });
});

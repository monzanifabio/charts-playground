import "./navbar.css";

const STORAGE_KEY = "charts-playground-theme";

const ICON_SUN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const BASE_URL = import.meta.env.BASE_URL;

function getEffectiveTheme() {
  return localStorage.getItem(STORAGE_KEY) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  document.dispatchEvent(new CustomEvent("themechange"));
}

function syncIcon(toggle) {
  const isDark = getEffectiveTheme() === "dark";
  toggle.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Safe to run directly — module scripts execute after HTML is fully parsed
const nav = document.createElement("nav");
nav.className = "app-nav";
nav.innerHTML = `
  <a href="${BASE_URL}" class="app-nav__brand">Charts Playground</a>
  <button class="app-nav__toggle" aria-label="Toggle theme"></button>
`;
document.body.prepend(nav);

const toggle = nav.querySelector(".app-nav__toggle");

toggle.addEventListener("click", () => {
  applyTheme(getEffectiveTheme() === "dark" ? "light" : "dark");
  syncIcon(toggle);
});

syncIcon(toggle);

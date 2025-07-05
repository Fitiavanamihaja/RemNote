const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector("#theme-toggle-label i");
const themeSlider = document.querySelector("#theme-toggle-label .slider");
const root = document.documentElement;
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarIcon = document.querySelector("#sidebar-toggle i");

// Validate DOM elements
if (!themeToggle) {
  console.warn("themeToggle element not found. Theme switching disabled.");
}
if (!themeIcon && !themeSlider) {
  console.warn("theme-toggle-label icon or slider not found. Theme indicator switching disabled.");
}
if (sidebarToggle && !sidebar) {
  console.warn("sidebar element not found. Sidebar toggling disabled.");
}
if (sidebarToggle && !sidebarIcon) {
  console.warn("sidebar-toggle icon not found. Hamburger menu icon switching disabled.");
}

// Apply dark mode
function applyDarkMode() {
  root.classList.add("dark");
  if (themeIcon) {
    themeIcon.classList.remove("ri-sun-line");
    themeIcon.classList.add("ri-moon-line");
  }
  localStorage.setItem("theme", "dark");
}

// Apply light mode
function applyLightMode() {
  root.classList.remove("dark");
  if (themeIcon) {
    themeIcon.classList.remove("ri-moon-line");
    themeIcon.classList.add("ri-sun-line");
  }
  localStorage.setItem("theme", "light");
}

// Initialize theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  applyDarkMode();
  if (themeToggle) themeToggle.checked = true;
} else {
  applyLightMode();
  if (themeToggle) themeToggle.checked = false;
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  });
}

// Sidebar toggle event listener
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", function () {
    const isHidden = sidebar.classList.contains("hidden");
    sidebar.classList.toggle("hidden");

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      if (isHidden) {
        mainContent.classList.remove("md:pl-0");
        mainContent.classList.add("md:pl-64");
      } else {
        mainContent.classList.remove("md:pl-64");
        mainContent.classList.add("md:pl-0");
      }
    }
    if (sidebarIcon) {
      sidebarIcon.classList.toggle("ri-close-line");
      sidebarIcon.classList.toggle("ri-menu-line");
    }
  });
}

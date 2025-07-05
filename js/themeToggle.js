document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const root = document.documentElement;

  const darkElements = [
    "header",
    "footer",
    "#loginPage",
    "#signupPage",
    ".card-feature",
    "form",
    ".text-gray-600",
    ".text-gray-900",
    ".bg-white",
    ".border-gray-100",
    ".shadow-md",
    ".shadow-lg",
  ];

  function applyDarkMode() {
    root.classList.add("dark");
    body.classList.remove("bg-white");
    body.classList.add("bg-gray-900");

    darkElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("dark-mode");
      });
    });
  }

  function applyLightMode() {
    root.classList.remove("dark");
    body.classList.remove("bg-gray-900");
    body.classList.add("bg-white");

    darkElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.remove("dark-mode");
      });
    });
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyDarkMode();
    themeToggle.checked = true;
  } else {
    applyLightMode();
    themeToggle.checked = false;
  }

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      applyDarkMode();
      localStorage.setItem("theme", "dark");
    } else {
      applyLightMode();
      localStorage.setItem("theme", "light");
    }
  });
});

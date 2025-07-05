document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const landingPage = document.getElementById("landingPage");
  const loginPage = document.getElementById("loginPage");
  const signupPage = document.getElementById("signupPage");
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    landingPage.classList.add("hidden");
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });
  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    landingPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    signupPage.classList.remove("hidden");
  });
});

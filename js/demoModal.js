document.addEventListener("DOMContentLoaded", function () {
  const demoButton = document.getElementById("demoButton");
  const demoModal = document.getElementById("demoModal");
  const closeDemo = document.getElementById("closeDemo");
  const demoSignupBtn = document.getElementById("demoSignupBtn");

  demoButton.addEventListener("click", function () {
    demoModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  closeDemo.addEventListener("click", function () {
    demoModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  demoModal.addEventListener("click", function (e) {
    if (e.target === demoModal) {
      demoModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  });

  demoSignupBtn.addEventListener("click", function () {
    demoModal.classList.add("hidden");
    document.body.style.overflow = "auto";
    landingPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    signupPage.classList.remove("hidden");
  });
});
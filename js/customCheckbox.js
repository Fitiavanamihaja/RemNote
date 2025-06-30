document.addEventListener("DOMContentLoaded", function () {
  const customCheckbox = document.getElementById("customCheckbox");
  const rememberCheckbox = document.getElementById("remember");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const termsInput = document.getElementById("terms");
  customCheckbox.addEventListener("click", function () {
    rememberCheckbox.checked = !rememberCheckbox.checked;
    const checkIcon = this.querySelector("i");
    if (rememberCheckbox.checked) {
      this.style.backgroundColor = "#4F46E5";
      this.style.borderColor = "#4F46E5";
      checkIcon.classList.remove("hidden");
    } else {
      this.style.backgroundColor = "transparent";
      this.style.borderColor = "#D1D5DB";
      checkIcon.classList.add("hidden");
    }
  });
  termsCheckbox.addEventListener("click", function () {
    termsInput.checked = !termsInput.checked;
    const checkIcon = this.querySelector("i");
    if (termsInput.checked) {
      this.style.backgroundColor = "#4F46E5";
      this.style.borderColor = "#4F46E5";
      checkIcon.classList.remove("hidden");
    } else {
      this.style.backgroundColor = "transparent";
      this.style.borderColor = "#D1D5DB";
      checkIcon.classList.add("hidden");
    }
  });
});
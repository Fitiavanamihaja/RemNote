const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


loginForm.innerHTML = `
<div class="container mx-auto px-4 py-16">
    <div class="max-w-md mx-auto bg-white !rounded-lg shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-['Pacifico'] text-primary mb-2">RemN</h1>
        <h2 class="text-2xl font-bold text-gray-900">Connexion</h2>
      </div>
      <form id="loginForm">
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="votre@email.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Mot de passe</label
          >
          <input
            type="password"
            id="password"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <input type="checkbox" id="remember" class="hidden" />
            <div
              class="w-5 h-5 border border-gray-300 !rounded-sm mr-2 flex items-center justify-center cursor-pointer"
              id="customCheckbox"
            >
              <i class="ri-check-line text-white hidden"></i>
            </div>
            <label
              for="remember"
              class="text-sm text-gray-700 cursor-pointer"
              >Se souvenir de moi</label
            >
          </div>
          <a href="#" class="text-sm text-primary hover:underline"
            >Mot de passe oublié ?</a
          >
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 !rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          Se connecter
        </button>
      </form>
      <div class="mt-6 text-center">
        <div class="relative flex items-center justify-center">
          <div class="border-t border-gray-300 absolute w-full"></div>
          <span class="bg-white px-2 text-sm text-gray-500 relative"
            >ou</span
          >
        </div>
        <p class="mt-4 text-sm text-gray-600">
          Pas encore de compte ?
          <a href="#" class="text-primary hover:underline" id="goToSignup"
            >S'inscrire</a
          >
        </p>
      </div>
    </div>
  </div>`;

signupForm.innerHTML = `
<div class="container mx-auto px-4 py-16">
    <div class="max-w-md mx-auto bg-white !rounded-lg shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-['Pacifico'] text-primary mb-2">RemN</h1>
        <h2 class="text-2xl font-bold text-gray-900">Créer un compte</h2>
      </div>
      <form id="signupForm">
        <div class="mb-4">
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Nom d'utilisateur</label
          >
          <input
            type="text"
            id="username"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="JohnDoe"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="signupEmail"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            type="email"
            id="signupEmail"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="votre@email.com"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="signupPassword"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Mot de passe</label
          >
          <input
            type="password"
            id="signupPassword"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Confirmer le mot de passe</label
          >
          <input
            type="password"
            id="confirmPassword"
            class="w-full px-3 py-2 border border-gray-300 !rounded-button text-gray-900"
            placeholder="••••••••"
            required
          />
        </div>
        <div class="flex items-center mb-6">
          <input type="checkbox" id="terms" class="hidden" required />
          <div
            class="w-5 h-5 border border-gray-300 !rounded-sm mr-2 flex items-center justify-center cursor-pointer"
            id="termsCheckbox"
          >
            <i class="ri-check-line text-white hidden"></i>
          </div>
          <label for="terms" class="text-sm text-gray-700 cursor-pointer"
            >J'accepte les
            <a href="#" class="text-primary hover:underline"
              >conditions d'utilisation</a
            ></label
          >
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 !rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          S'inscrire
        </button>
      </form>
      <div class="mt-6 text-center">
        <div class="relative flex items-center justify-center">
          <div class="border-t border-gray-300 absolute w-full"></div>
          <span class="bg-white px-2 text-sm text-gray-500 relative"
            >ou</span
          >
        </div>
        <p class="mt-4 text-sm text-gray-600">
          Déjà un compte ?
          <a href="#" class="text-primary hover:underline" id="goToLogin"
            >Se connecter</a
          >
        </p>
      </div>
    </div>
  </div>`;


document.addEventListener("DOMContentLoaded", function () {

  // Rediriger vers app.html si déjà connecté
  if (localStorage.getItem("isAuthenticated") === "true") {
    window.location.href = "app.html";
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Vérifier les informations dans localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "app.html";
    } else {
      alert("Email ou mot de passe incorrect");
    }
  });

  // Gestion de l'inscription
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Enregistrer le nouvel utilisateur
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      alert("Cet email est déjà utilisé");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify({ email, password }));
    window.location.href = "app.html";
  });
});

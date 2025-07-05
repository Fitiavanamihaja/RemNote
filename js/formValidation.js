document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("isAuthenticated") === "true") {
    window.location.href = "app.html";
  }

  function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1 error-message';
    errorDiv.textContent = message;
    const parent = field.parentElement;
    if (parent.querySelector('.error-message')) {
      parent.querySelector('.error-message').remove();
    }
    parent.appendChild(errorDiv);
    
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }

  function hideErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
      if (error.parentNode) {
        error.parentNode.removeChild(error);
      }
    });
  }

  function showLoading(button) {
    const originalText = button.textContent;
    button.innerHTML = '<div class="flex items-center justify-center"><i class="ri-loader-4-line animate-spin"></i></div>';
    button.disabled = true;
    return originalText;
  }

  function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
  }

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    hideErrors();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submitButton = this.querySelector('button[type="submit"]');

    if (!email.value.trim()) {
      showError(email, "Veuillez entrer une adresse email");
      return;
    }
    if (!password.value.trim()) {
      showError(password, "Veuillez entrer un mot de passe");
      return;
    }

    const originalText = showLoading(submitButton);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email.value && u.password === password.value);

      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'app.html';
      } else {
        showError(email, "Email ou mot de passe incorrect");
        hideLoading(submitButton, originalText);
      }
    }, 1000);
  });

  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    hideErrors();

    const username = document.getElementById("username");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitButton = this.querySelector('button[type="submit"]');

    if (!username.value.trim()) {
      showError(username, "Veuillez entrer un nom d'utilisateur");
      return;
    }
    if (!email.value.trim()) {
      showError(email, "Veuillez entrer une adresse email");
      return;
    }
    if (!password.value.trim()) {
      showError(password, "Veuillez entrer un mot de passe");
      return;
    }
    if (password.value !== confirmPassword.value) {
      showError(password, "Les mots de passe ne correspondent pas");
      showError(confirmPassword, "Les mots de passe ne correspondent pas");
      return;
    }

    const originalText = showLoading(submitButton);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === email.value);

      if (existingUser) {
        showError(email, "Cette adresse email est déjà utilisée");
        hideLoading(submitButton, originalText);
        return;
      }

      const newUser = {
        id: Date.now(),
        username: username.value,
        email: email.value,
        password: password.value
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      window.location.href = 'app.html';
    }, 1500);
  });
});


document.addEventListener("DOMContentLoaded", function () {

  // Rediriger vers app.html si déjà connecté
  if (localStorage.getItem("isAuthenticated") === "true") {
    window.location.href = "app.html";
  }

  // Gestionnaire d'événements pour le formulaire de connexion
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    hideErrors();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Validation du formulaire
    if (!email.value.trim()) {
      showError(email, "Veuillez entrer une adresse email");
      return;
    }
    if (!password.value.trim()) {
      showError(password, "Veuillez entrer un mot de passe");
      return;
    }

    // Afficher l'état de chargement
    const originalText = showLoading(submitButton);

    // Simuler une requête d'authentification
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email.value && u.password === password.value);

      if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'app.html';
      } else {
        showError(email, "Email ou mot de passe incorrect");
        hideLoading(submitButton, originalText);
      }
    }, 1000);
  });

  // Gestionnaire d'événements pour le formulaire d'inscription
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    hideErrors();

    const username = document.getElementById("username");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitButton = signupForm.querySelector('button[type="submit"]');

    // Validation du formulaire
    if (!username.value.trim()) {
      showError(username, "Veuillez entrer un nom d'utilisateur");
      return;
    }
    if (!email.value.trim()) {
      showError(email, "Veuillez entrer une adresse email");
      return;
    }
    if (!password.value.trim()) {
      showError(password, "Veuillez entrer un mot de passe");
      return;
    }
    if (password.value !== confirmPassword.value) {
      showError(password, "Les mots de passe ne correspondent pas");
      showError(confirmPassword, "Les mots de passe ne correspondent pas");
      return;
    }

    // Afficher l'état de chargement
    const originalText = showLoading(submitButton);

    // Simuler une requête d'inscription
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.email === email.value);

      if (existingUser) {
        showError(email, "Cette adresse email est déjà utilisée");
        hideLoading(submitButton, originalText);
        return;
      }

      const newUser = {
        id: Date.now(),
        username: username.value,
        email: email.value,
        password: password.value
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      window.location.href = 'app.html';
    }, 1500);
  });

  // Gestionnaire d'événements pour les boutons de connexion/inscription
  document.getElementById('loginBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  });

  document.getElementById('signupBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });
});
  
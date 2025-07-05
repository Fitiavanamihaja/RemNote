// Vérification d'authentification
if (localStorage.getItem('isAuthenticated') !== 'true') {
  window.location.href = 'index.html';
}

// Fonction de déconnexion
function setupLogout() {
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'logout-btn text-red-500 py-2';
  logoutBtn.innerHTML = '<i class="ri-logout-box-r-line"></i> Déconnexion';
  logoutBtn.onclick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  };
  document.querySelector('aside').appendChild(logoutBtn);
}

// Afficher l'email de l'utilisateur
function displayUserEmail() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && user.email) {
    const userEmail = document.createElement('div');
    userEmail.className = 'user-email';
    userEmail.textContent = user.email;
    document.querySelector('#header-right').prepend(userEmail);
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  setupLogout();
  displayUserEmail();
});

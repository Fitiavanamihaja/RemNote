document.addEventListener('DOMContentLoaded', () => {
  const navbarControls = document.getElementById('navbar-controls');
  
  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  // Ajouter l'email de l'utilisateur
  if (user && user.email) {
    const userEmail = document.createElement('div');
    userEmail.className = 'text-sm text-gray-600';
    userEmail.textContent = user.email;
    navbarControls.appendChild(userEmail);
  }
  
  // Bouton mode sombre
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'p-2 rounded-full hover:bg-gray-100';
  darkModeToggle.innerHTML = '<i class="ri-moon-line"></i>';
  darkModeToggle.onclick = () => document.getElementById('theme-toggle').click();
  navbarControls.appendChild(darkModeToggle);
  
  // Bouton double affichage
  const splitViewToggle = document.createElement('button');
  splitViewToggle.className = 'p-2 rounded-full hover:bg-gray-100';
  splitViewToggle.innerHTML = '<i class="ri-layout-column-line"></i>';
  splitViewToggle.onclick = () => document.getElementById('split-view-toggle').click();
  navbarControls.appendChild(splitViewToggle);
  
  // Bouton de déconnexion
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'p-2 rounded-full hover:bg-gray-100 text-red-500';
  logoutBtn.innerHTML = '<i class="ri-logout-box-r-line"></i>';
  logoutBtn.onclick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  };
  navbarControls.appendChild(logoutBtn);
});

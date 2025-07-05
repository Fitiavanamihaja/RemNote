const currentPath = window.location.pathname;

// Handle authentication for index.html
if (currentPath.includes('index.html')) {
  const loginForm = document.querySelector('#loginForm');
  const signupForm = document.querySelector('#signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#email')?.value;
      const password = loginForm.querySelector('#password')?.value;
      if (email && password) {
        if (handleLogin(email, password)) {
          document.getElementById('loginPage').classList.add('hidden');
          document.getElementById('landingPage').classList.remove('hidden');
          window.location.href = 'app.html';
        } else {
          alert('Email ou mot de passe incorrect.');
        }
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('#signupEmail')?.value;
      const password = signupForm.querySelector('#signupPassword')?.value;
      if (email && password) {
        if (handleSignup(email, password)) {
          document.getElementById('signupPage').classList.add('hidden');
          document.getElementById('landingPage').classList.remove('hidden');
          window.location.href = 'app.html';
        } else {
          alert('Cet email est déjà utilisé.');
        }
      }
    });
  }
}

// Show warning if not authenticated in app.html
if (
  !localStorage.getItem('isAuthenticated') &&
  currentPath.includes('app.html')
) {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="p-6 text-center">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Non connecté</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Veuillez vous connecter pour accéder à vos notes.</p>
        <a href="index.html" class="bg-primary text-white py-2 px-4 !rounded-button hover:bg-opacity-90">Se connecter</a>
      </div>
    `;
  }
}

// Function to handle login
function handleLogin(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ email }));
    return true;
  }
  return false;
}

// Function to handle signup
function handleSignup(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    return false;
  }
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('currentUser', JSON.stringify({ email }));
  return true;
}

// Function to set up logout button
function setupLogout() {
  const aside = document.querySelector('aside');
  if (!aside) {
    console.warn("Aside element not found. Logout button not added.");
    return;
  }
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'logout-btn text-red-500 hover:text-red-700 py-2 px-4 flex items-center gap-2 w-full text-left text-sm font-medium';
  logoutBtn.innerHTML = '<i class="ri-logout-box-r-line"></i> Déconnexion';
  logoutBtn.onclick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  };
  aside.appendChild(logoutBtn);
}

// Function to display user email
function displayUserEmail() {
  const headerRight = document.querySelector('#header-right');
  if (!headerRight) {
    console.warn("header-right element not found. User email not displayed.");
    return;
  }
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (user && user.email) {
    const userEmail = document.createElement('div');
    userEmail.className = 'user-email hidden md:block text-gray-700 dark:text-gray-300 text-sm font-medium mr-4';
    userEmail.textContent = user.email;
    headerRight.prepend(userEmail);
  }
}

// Initialize for app.html
if (currentPath.includes('app.html') && localStorage.getItem('isAuthenticated') === 'true') {
  setupLogout();
  displayUserEmail();
}
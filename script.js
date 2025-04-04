// Main JavaScript file for FoodRescue application

// DOM utility functions
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = $('.mobile-menu-btn');
  const navLinks = $('.nav-links');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}

// Form validation utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.form-error') || document.createElement('div');
  
  if (!formGroup.querySelector('.form-error')) {
    errorElement.classList.add('form-error');
    formGroup.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  input.classList.add('error');
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.form-error');
  
  if (errorElement) {
    errorElement.textContent = '';
  }
  
  input.classList.remove('error');
}

// Auth tabs functionality
function initAuthTabs() {
  const loginTab = $('#login-tab');
  const registerTab = $('#register-tab');
  const loginForm = $('#login-form');
  const registerForm = $('#register-form');
  
  if (loginTab && registerTab) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });
    
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    });
  }
}

// User authentication state
let currentUser = null;

// Mock API functions (to be replaced with real API calls)
function login(username, password) {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      if (username === 'user@example.com' && password === 'password123') {
        currentUser = {
          id: 1,
          username: 'user@example.com',
          fullName: 'Demo User',
          zipCode: '110001'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        resolve(currentUser);
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
}

function register(userData) {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      currentUser = {
        id: 1,
        username: userData.email,
        fullName: userData.fullName,
        zipCode: userData.zipCode
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      resolve(currentUser);
    }, 1000);
  });
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Check if user is logged in
function checkAuth() {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    currentUser = JSON.parse(userStr);
    return true;
  }
  return false;
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!checkAuth()) {
    window.location.href = 'auth.html';
  }
}

// Food listing data
const mockFoodCategories = [
  { id: 'fruits_vegetables', name: 'Fruits & Vegetables', count: 45, icon: 'apple' },
  { id: 'bakery', name: 'Bakery Items', count: 32, icon: 'bread' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', count: 28, icon: 'milk' },
  { id: 'meat_fish', name: 'Meat & Fish', count: 17, icon: 'meat' },
  { id: 'prepared_foods', name: 'Prepared Foods', count: 23, icon: 'food' },
  { id: 'pantry_items', name: 'Pantry Items', count: 36, icon: 'package' },
  { id: 'other', name: 'Other', count: 19, icon: 'more-horizontal' }
];

const mockFoodListings = [
  {
    id: 1,
    title: 'Fresh Organic Vegetables',
    zipCode: '110001',
    category: 'fruits_vegetables',
    categoryName: 'Fruits & Vegetables',
    weight: 5, // in kg
    description: 'Assorted organic vegetables from my garden. Includes tomatoes, cucumbers, and bell peppers.',
    freshness: 'fresh',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    userId: 1,
    userName: 'Priya Sharma',
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    title: 'Bakery Leftovers',
    zipCode: '110016',
    category: 'bakery',
    categoryName: 'Bakery Items',
    weight: 2.5, // in kg
    description: 'Assorted bread and pastries from local bakery. Must pick up today.',
    freshness: 'expiring_soon',
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
    userId: 2,
    userName: 'Rahul Patel',
    createdAt: new Date(Date.now() - 7200000)
  },
  {
    id: 3,
    title: 'Unopened Milk and Yogurt',
    zipCode: '110017',
    category: 'dairy_eggs',
    categoryName: 'Dairy & Eggs',
    weight: 3, // in kg
    description: 'Unopened milk (2L) and yogurt containers. Expiring in 3 days.',
    freshness: 'expiring_soon',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
    userId: 3,
    userName: 'Ananya Singh',
    createdAt: new Date(Date.now() - 10800000)
  }
];

// Render food category cards
function renderCategories(categories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <div class="category-icon">
        <i class="icon-${category.icon}"></i>
      </div>
      <h3 class="category-name">${category.name}</h3>
      <p class="category-count">${category.count} items</p>
    `;
    
    card.addEventListener('click', () => {
      window.location.href = `browse.html?category=${category.id}`;
    });
    
    container.appendChild(card);
  });
}

// Format relative time (e.g., "2 hours ago")
function formatRelativeTime(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
}

// Render food listing cards
function renderFoodListings(listings, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  listings.forEach(listing => {
    const card = document.createElement('div');
    card.className = 'food-card';
    
    // Create badge class based on freshness
    let badgeClass = 'food-badge';
    let badgeText = 'Fresh';
    
    if (listing.freshness === 'expiring_soon') {
      badgeClass += ' expiring';
      badgeText = 'Expiring Soon';
    } else if (listing.freshness === 'expired') {
      badgeClass += ' expired';
      badgeText = 'Expired';
    }
    
    card.innerHTML = `
      <div class="food-image">
        <img src="${listing.imageUrl}" alt="${listing.title}">
        <div class="${badgeClass}">${badgeText}</div>
      </div>
      <div class="food-content">
        <h3 class="food-title">${listing.title}</h3>
        <div class="food-location">
          <i class="icon-map-pin"></i>
          <span>${listing.zipCode}</span>
        </div>
        <div class="food-meta">
          <div class="food-category">
            <i class="icon-tag"></i>
            <span>${listing.categoryName}</span>
          </div>
          <div class="food-weight">
            <i class="icon-scale"></i>
            <span>${listing.weight} kg</span>
          </div>
        </div>
        <p class="food-description">${listing.description}</p>
        <div class="food-footer">
          <div class="food-user">
            <div class="user-avatar">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(listing.userName)}&background=22c55e&color=fff" alt="${listing.userName}">
            </div>
            <span class="user-name">${listing.userName}</span>
          </div>
          <div class="food-time">${formatRelativeTime(listing.createdAt)}</div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      window.location.href = `listing-detail.html?id=${listing.id}`;
    });
    
    container.appendChild(card);
  });
}

// Form submission handlers
function handleLoginForm() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = loginForm.querySelector('input[name="email"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      
      // Basic validation
      let isValid = true;
      
      if (!validateEmail(email)) {
        showError(loginForm.querySelector('input[name="email"]'), 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!password) {
        showError(loginForm.querySelector('input[name="password"]'), 'Password is required');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';
      
      try {
        await login(email, password);
        window.location.href = 'index.html';
      } catch (error) {
        showError(loginForm.querySelector('input[name="email"]'), error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
      }
    });
  }
}

function handleRegisterForm() {
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const fullName = registerForm.querySelector('input[name="fullName"]').value;
      const email = registerForm.querySelector('input[name="email"]').value;
      const password = registerForm.querySelector('input[name="password"]').value;
      const zipCode = registerForm.querySelector('input[name="zipCode"]').value;
      const submitBtn = registerForm.querySelector('button[type="submit"]');
      
      // Basic validation
      let isValid = true;
      
      if (!fullName) {
        showError(registerForm.querySelector('input[name="fullName"]'), 'Full name is required');
        isValid = false;
      }
      
      if (!validateEmail(email)) {
        showError(registerForm.querySelector('input[name="email"]'), 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!validatePassword(password)) {
        showError(registerForm.querySelector('input[name="password"]'), 'Password must be at least 8 characters');
        isValid = false;
      }
      
      if (!zipCode) {
        showError(registerForm.querySelector('input[name="zipCode"]'), 'ZIP code is required');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account...';
      
      try {
        await register({ fullName, email, password, zipCode });
        window.location.href = 'index.html';
      } catch (error) {
        showError(registerForm.querySelector('input[name="email"]'), error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      }
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Update navigation based on auth state
  const authLinks = $$('.auth-only');
  const nonAuthLinks = $$('.non-auth-only');
  const userNameElement = $('.user-name');
  
  if (checkAuth()) {
    authLinks.forEach(link => link.style.display = 'flex');
    nonAuthLinks.forEach(link => link.style.display = 'none');
    
    if (userNameElement && currentUser) {
      userNameElement.textContent = currentUser.fullName;
    }
  } else {
    authLinks.forEach(link => link.style.display = 'none');
    nonAuthLinks.forEach(link => link.style.display = 'flex');
  }
  
  // Initialize page-specific functionality
  const currentPage = document.body.id;
  
  switch (currentPage) {
    case 'home-page':
      renderCategories(mockFoodCategories.slice(0, 4), 'categories-container');
      renderFoodListings(mockFoodListings, 'listings-container');
      break;
      
    case 'browse-page':
      requireAuth();
      
      // Get category filter from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFilter = urlParams.get('category');
      
      const filteredListings = categoryFilter 
        ? mockFoodListings.filter(listing => listing.category === categoryFilter)
        : mockFoodListings;
      
      renderFoodListings(filteredListings, 'browse-listings-container');
      break;
      
    case 'auth-page':
      initAuthTabs();
      handleLoginForm();
      handleRegisterForm();
      break;
      
    case 'my-listings-page':
      requireAuth();
      
      const myListings = mockFoodListings.filter(listing => listing.userId === currentUser.id);
      renderFoodListings(myListings, 'my-listings-container');
      break;
  }
  
  // Handle logout button clicks
  const logoutBtn = $('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
});
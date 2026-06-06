/*
 * AuctionPropertyToday - Injectable Luxury Navbar Component
 * Features: Sticky Glassmorphism, Theme Switcher, Search Modal, Responsive Hamburger Drawer
 */

(function() {
  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    injectNavbar();
    setupNavbarInteractions();
  });

  // Inject Navbar HTML structure
  function injectNavbar() {
    const header = document.createElement('header');
    header.className = 'luxury-navbar';
    
    // Identify current page filename to set active link
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    const isHome = page === "index.html" || page === "";
    const isListings = page === "listings.html";
    const isLoans = page === "loans.html";
    const isInsurance = page === "insurance.html";
    const isAdmin = page === "admin.html";

    // Setup dynamic paths for core pillars and merged home anchors
    const loansLink = "loans.html";
    const insuranceLink = "insurance.html";
    const aboutLink = isHome ? "#about" : "index.html#about";
    const contactLink = isHome ? "#contact" : "index.html#contact";

    // Dynamic session checking
    const isClientLoggedIn = JSON.parse(localStorage.getItem('clientSession') || '{}').authenticated === true;
    const isAdminLoggedIn = localStorage.getItem('isAdmin') === 'true' && localStorage.getItem('sb-xqhrjhvbustdwmrmikya-auth-token') !== null;
    
    const loginBtnHTML = (isClientLoggedIn || isAdminLoggedIn) 
      ? `<a href="#" class="nav-btn-login" id="nav-logout-btn" style="border-color:var(--status-cancelled); color:var(--status-cancelled);">Logout</a>`
      : `<a href="login.html" class="nav-btn-login">Login</a>`;



    const loginMobileHTML = (isClientLoggedIn || isAdminLoggedIn)
      ? `<li><a href="#" class="nav-link" id="mobile-logout-btn" style="color:var(--status-cancelled);">Sign Out</a></li>`
      : `<li><a href="login.html" class="nav-link" style="color:var(--gold-primary);">Sign In</a></li>`;

    const adminLinkHTML = isClientLoggedIn 
      ? '' 
      : `<li><a href="admin.html" class="nav-link ${isAdmin ? 'active' : ''}">Admin Dashboard</a></li>`;

    header.innerHTML = `
      <div class="container navbar-container">
        <a href="index.html" class="navbar-logo">
          <div>
            <span>AUCTION</span><span class="gold-text-gradient" style="font-weight:700;">PROPERTY</span>
            <span class="logo-sub">TODAY</span>
          </div>
        </a>
        
        <nav>
          <ul class="navbar-links">
            <li><a href="index.html" class="nav-link ${isHome ? 'active' : ''}">Home</a></li>
            <li><a href="listings.html" class="nav-link ${isListings ? 'active' : ''}">Properties</a></li>
            <li><a href="${loansLink}" class="nav-link ${isLoans ? 'active' : ''}">Loans</a></li>
            <li><a href="${insuranceLink}" class="nav-link ${isInsurance ? 'active' : ''}">Insurance</a></li>
            <li><a href="${aboutLink}" class="nav-link">About Us</a></li>
            <li><a href="${contactLink}" class="nav-link">Contact</a></li>
            ${adminLinkHTML}
          </ul>
        </nav>

        <div class="nav-controls">
          
          <!-- Theme toggle button -->
          <button class="nav-btn" id="nav-theme-toggle" title="Toggle Theme">
            <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
          
          <!-- Logged out Admin / Login link -->
          ${loginBtnHTML}
          
          <!-- Hamburger Menu button -->
          <button class="nav-btn hamburger-btn" id="nav-drawer-trigger" title="Open Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    `;

    // Prepend header to body
    document.body.prepend(header);

    // Inject Mobile Nav Drawer
    const drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';
    drawer.id = 'mobile-nav-drawer';
    drawer.innerHTML = `
      <div class="drawer-header">
        <a href="index.html" class="navbar-logo">
          <div>
            <span>AUCTION</span><span class="gold-text-gradient" style="font-weight:700;">PROP</span>
          </div>
        </a>
        <button class="drawer-close" id="mobile-drawer-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="index.html" class="nav-link ${isHome ? 'active' : ''}">Home</a></li>
        <li><a href="listings.html" class="nav-link ${isListings ? 'active' : ''}">Properties</a></li>
        <li><a href="${loansLink}" class="nav-link ${isLoans ? 'active' : ''}">Loans</a></li>
        <li><a href="${insuranceLink}" class="nav-link ${isInsurance ? 'active' : ''}">Insurance</a></li>
        <li><a href="${aboutLink}" class="nav-link">About Us</a></li>
        <li><a href="${contactLink}" class="nav-link">Contact</a></li>
        ${adminLinkHTML}
        ${loginMobileHTML}
      </ul>
    `;
    document.body.appendChild(drawer);

    // Inject Mobile Drawer Overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    overlay.id = 'mobile-drawer-overlay';
    document.body.appendChild(overlay);

  }

  // Setup navbar interactions, scroll handlers, theme logic
  function setupNavbarInteractions() {
    const navbar = document.querySelector('.luxury-navbar');
    
    // 1. Sticky Navbar on Scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // 2. Global Dark/Light Theme Switching
    const themeBtn = document.getElementById('nav-theme-toggle');
    const sunIcon = themeBtn.querySelector('.sun-icon');
    const moonIcon = themeBtn.querySelector('.moon-icon');

    function updateThemeUI(theme) {
      if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }

    // Apply immediate loaded theme state
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeUI(currentTheme);

    themeBtn.addEventListener('click', function() {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const targetTheme = activeTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateThemeUI(targetTheme);
    });

    // 3. Mobile Hamburger Navigation Drawer
    const drawerTrigger = document.getElementById('nav-drawer-trigger');
    const drawerClose = document.getElementById('mobile-drawer-close');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (drawerTrigger) drawerTrigger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Auto-close drawer on link click (highly elegant for smooth anchors)
    if (drawer) {
      const drawerLinks = drawer.querySelectorAll('.mobile-nav-links a');
      drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
      });
    }


    // Dynamic Logout Listeners
    const logoutBtn = document.getElementById('nav-logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    async function handleLogout(e) {
      e.preventDefault();
      const confirmLogout = confirm("Are you sure you want to sign out?");
      if (!confirmLogout) return;

      if (window.supabaseClient) {
        await window.supabaseClient.auth.signOut();
      }
      localStorage.removeItem("sb-xqhrjhvbustdwmrmikya-auth-token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("clientSession");
      window.location.replace("login.html");
    }

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
  }
})();

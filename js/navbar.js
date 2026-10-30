/**
 * ElderCare - Navbar Component
 * Features: Dashboard navigation, Dark mode, RTL/LTR toggle, Mobile menu
 */

const NAVBAR_HTML = `
<header class="site-header" id="main-header">
  <div class="header-container">

    <a href="{{PREFIX}}index.html" class="brand-logo" aria-label="ElderCare Homepage">
      <img src="{{PREFIX}}assets/logo/logo.png" alt="ElderCare logo" data-light-src="{{PREFIX}}assets/logo/logo.png" data-dark-src="{{PREFIX}}assets/logo/logo.png" />
      <div class="brand-text">
        <span class="brand-name">ElderCare</span>
      </div>
    </a>

    <nav class="nav-menu" aria-label="Main Navigation">
      <ul class="nav-list">
        <li class="nav-item"><a href="{{PREFIX}}index.html"    class="nav-link" data-page="index.html">Home 1</a></li>
        <li class="nav-item"><a href="{{PREFIX}}home2.html"   class="nav-link" data-page="home2.html">Home 2</a></li>
        <li class="nav-item"><a href="{{PREFIX}}about.html"   class="nav-link" data-page="about.html">About Us</a></li>
        <li class="nav-item"><a href="{{PREFIX}}services.html" class="nav-link" data-page="services.html">Services</a></li>
        <li class="nav-item"><a href="{{PREFIX}}blog.html"    class="nav-link" data-page="blog.html">Blog</a></li>
        <li class="nav-item"><a href="{{PREFIX}}contact.html" class="nav-link" data-page="contact.html">Contact</a></li>
        <li class="nav-item">
          <div class="dashboard-menu">
            <button type="button" class="nav-link dashboard-menu-toggle" data-page="dashboard.html" data-dashboard-toggle aria-expanded="false" aria-controls="dashboardOptions">
              <span>Dashboard</span>
              <svg class="dashboard-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>
            </button>
            <ul class="dashboard-dropdown" id="dashboardOptions" aria-label="Dashboard options" aria-hidden="true">
              <li><a href="{{PREFIX}}user/dashboard.html" class="dashboard-option" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></svg>
                <span>User Dashboard</span>
              </a></li>
              <li><a href="{{PREFIX}}admin/dashboard.html" class="dashboard-option" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-2.9 8-7 10-4.1-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Admin Dashboard</span>
              </a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>

    <div class="header-controls" id="headerControls">

      <button class="ctrl-btn" id="themeToggleBtn" aria-label="Switch to dark mode" title="Switch to dark mode">
        <svg class="ctrl-icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg class="ctrl-icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1"  x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1"  y1="12" x2="3"  y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>

      <button class="ctrl-btn ctrl-btn--dir" id="dirToggleBtn" aria-label="Switch Text Direction" title="Switch Text Direction">
        <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 6h10M3 10h7M3 14h10M3 18h7"/>
          <path d="M15 7h6M18 4l3 3-3 3"/>
          <path d="M21 17h-6M18 14l-3 3 3 3"/>
        </svg>
      </button>

      <a href="{{PREFIX}}login.html" class="header-cta">
        <span>Get Started</span>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
      </a>

      <button class="mobile-toggle" id="mobileMenuBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </button>

    </div>
  </div>

  <div class="mobile-nav-drawer" id="mobileMenu" role="dialog" aria-label="Mobile Navigation" aria-hidden="true">
    <div class="mobile-nav-inner">
      <div class="mobile-nav-topbar">
        <a href="{{PREFIX}}index.html" class="brand-logo" aria-label="ElderCare">
          <img src="{{PREFIX}}assets/logo/logo.png" alt="ElderCare logo" data-light-src="{{PREFIX}}assets/logo/logo.png" data-dark-src="{{PREFIX}}assets/logo/logo.png" />
          <div class="brand-text">
            <span class="brand-name">ElderCare</span>
          </div>
        </a>
        <button class="mobile-close-btn" id="mobileCloseBtn" aria-label="Close navigation menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <ul class="mobile-nav-list">
        <li><a href="{{PREFIX}}index.html"    class="mobile-nav-link" data-page="index.html">Home 1</a></li>
        <li><a href="{{PREFIX}}home2.html"   class="mobile-nav-link" data-page="home2.html">Home 2</a></li>
        <li><a href="{{PREFIX}}about.html"   class="mobile-nav-link" data-page="about.html">About Us</a></li>
        <li><a href="{{PREFIX}}services.html" class="mobile-nav-link" data-page="services.html">Services</a></li>
        <li><a href="{{PREFIX}}blog.html"    class="mobile-nav-link" data-page="blog.html">Blog</a></li>
        <li><a href="{{PREFIX}}contact.html" class="mobile-nav-link" data-page="contact.html">Contact</a></li>
        <li class="mobile-dashboard-item">
          <button type="button" class="mobile-nav-link mobile-dashboard-toggle" data-page="dashboard.html" data-dashboard-toggle aria-expanded="false" aria-controls="mobileDashboardOptions">
            <span>Dashboard</span>
            <svg class="dashboard-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>
          </button>
          <ul class="mobile-dashboard-options" id="mobileDashboardOptions" aria-label="Dashboard options" aria-hidden="true">
            <li><a href="{{PREFIX}}user/dashboard.html" class="mobile-dashboard-option" tabindex="-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></svg>
              <span>User Dashboard</span>
            </a></li>
            <li><a href="{{PREFIX}}admin/dashboard.html" class="mobile-dashboard-option" tabindex="-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-2.9 8-7 10-4.1-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Admin Dashboard</span>
            </a></li>
          </ul>
        </li>
      </ul>

      <div class="mobile-section-divider"></div>
      <div class="mobile-section-label">Account</div>
      <ul class="mobile-nav-list">
        <li><a href="{{PREFIX}}login.html"           class="mobile-nav-link">Login</a></li>
        <li><a href="{{PREFIX}}signup.html"          class="mobile-nav-link">Sign Up</a></li>
      </ul>

      <a href="{{PREFIX}}login.html" class="header-cta mobile-nav-cta">
        <span>Get Started</span>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
      </a>

      <div class="mobile-section-divider"></div>
      <div class="mobile-controls-row">
        <button class="mobile-ctrl-btn" id="mobileThemeBtn" aria-label="Toggle theme">
          <svg class="ctrl-icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg class="ctrl-icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <span id="mobileThemeLabel">Dark Mode</span>
        </button>
        <button class="mobile-ctrl-btn mobile-ctrl-btn--dir" id="mobileDirBtn" aria-label="Switch Text Direction" title="Switch Text Direction">
          <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h10M3 10h7M3 14h10M3 18h7"/><path d="M15 7h6M18 4l3 3-3 3"/><path d="M21 17h-6M18 14l-3 3 3 3"/></svg>
          <span id="mobileDirLabel">Switch to RTL</span>
        </button>
      </div>

    </div>
  </div>
</header>
`;

function getElderCarePathPrefix() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/user/') || path.includes('/admin/')) return '../';
  return '';
}

function renderNavbar(targetContainer) {
  const container = targetContainer || document.getElementById('navbar-container');
  if (!container) return;
  const prefix = getElderCarePathPrefix();
  container.innerHTML = NAVBAR_HTML.replace(/\{\{PREFIX\}\}/g, prefix);
  initNavbar();
}

function _initDashboardDropdowns() {
  const toggles = [...document.querySelectorAll('[data-dashboard-toggle]')];
  if (!toggles.length) return;

  function setOpen(toggle, isOpen) {
    const menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.closest('.dashboard-menu, .mobile-dashboard-item')?.classList.toggle('is-open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    menu.querySelectorAll('a').forEach(link => link.tabIndex = isOpen ? 0 : -1);
  }

  function closeAll() {
    toggles.forEach(toggle => setOpen(toggle, false));
  }

  toggles.forEach(toggle => {
    const menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;

    toggle.addEventListener('click', event => {
      event.stopPropagation();
      const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
      closeAll();
      setOpen(toggle, shouldOpen);
    });

    toggle.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      closeAll();
      setOpen(toggle, true);
      const links = [...menu.querySelectorAll('a')];
      (event.key === 'ArrowUp' ? links[links.length - 1] : links[0])?.focus();
    });

    menu.addEventListener('keydown', event => {
      const links = [...menu.querySelectorAll('a')];
      const currentIndex = links.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(toggle, false);
        toggle.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const offset = event.key === 'ArrowDown' ? 1 : -1;
        links[(currentIndex + offset + links.length) % links.length]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        links[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        links[links.length - 1]?.focus();
      }
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeAll));
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.dashboard-menu, .mobile-dashboard-item')) return;
    closeAll();
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openToggle = toggles.find(toggle => toggle.getAttribute('aria-expanded') === 'true');
    if (!openToggle) return;
    closeAll();
    openToggle.focus();
  });
}

function initNavbar() {
  _initStickyHeader();
  _initActiveLink();
  _initDashboardDropdowns();
  _initMobileMenu();
  _initTheme();
  _initDirection();
}

function _initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function _initActiveLink() {
  let page = window.location.pathname.replace(/\\/g, '/');
  page = page.substring(page.lastIndexOf('/') + 1) || 'index.html';
  if (page === 'service-details.html' || page === 'service-detail.html') page = 'services.html';
  if (page === 'blog-details.html' || page === 'blog-detail.html')    page = 'blog.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === page);
  });
}

function _initMobileMenu() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer   = document.getElementById('mobileMenu');
  if (!openBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    openBtn.classList.add('is-active');
    document.body.classList.add('menu-open');
  }
  function closeMenu() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.classList.remove('is-active');
    document.body.classList.remove('menu-open');
  }

  openBtn.addEventListener('click', e => { e.stopPropagation(); openMenu(); });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('click', e => {
    const header = document.getElementById('main-header');
    if (header && !header.contains(e.target) && drawer.classList.contains('is-open')) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) { closeMenu(); openBtn.focus(); } });
  drawer.querySelectorAll('.mobile-nav-link, .mobile-dashboard-option').forEach(link => link.addEventListener('click', closeMenu));
}

function _initTheme() {
  const saved = localStorage.getItem('eldercare-theme') || 'light';
  _applyTheme(saved);
  const btns = [document.getElementById('themeToggleBtn'), document.getElementById('mobileThemeBtn')];
  btns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      _applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  });
}

function _applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('eldercare-theme', theme);
  const isDark = theme === 'dark';

  document.querySelectorAll('img[alt="ElderCare logo"]').forEach(img => {
    const lightSrc = img.getAttribute('data-light-src') || img.src;
    const darkSrc = img.getAttribute('data-dark-src') || lightSrc;
    img.src = isDark ? darkSrc : lightSrc;
  });

  const desktopBtn = document.getElementById('themeToggleBtn');
  if (desktopBtn) { desktopBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode'); desktopBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode'); }
  const mobileLabel = document.getElementById('mobileThemeLabel');
  if (mobileLabel) mobileLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function _initDirection() {
  const saved = localStorage.getItem('eldercare-direction') || 'ltr';
  _applyDirection(saved);
  const btns = [document.getElementById('dirToggleBtn'), document.getElementById('mobileDirBtn')];
  btns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      const cur = document.documentElement.dir || 'ltr';
      _applyDirection(cur === 'rtl' ? 'ltr' : 'rtl');
    });
  });
}

function _applyDirection(dir) {
  document.documentElement.dir = dir;
  localStorage.setItem('eldercare-direction', dir);
  const isRTL = dir === 'rtl';
  const desktopBtn = document.getElementById('dirToggleBtn');
  if (desktopBtn) { desktopBtn.setAttribute('aria-label', 'Switch Text Direction'); desktopBtn.setAttribute('title', 'Switch Text Direction'); }
  const mobileLabel = document.getElementById('mobileDirLabel');
  if (mobileLabel) mobileLabel.textContent = isRTL ? 'Switch to LTR' : 'Switch to RTL';
  const mobileBtn = document.getElementById('mobileDirBtn');
  if (mobileBtn) { mobileBtn.setAttribute('aria-label', 'Switch Text Direction'); mobileBtn.setAttribute('title', 'Switch Text Direction'); }
}

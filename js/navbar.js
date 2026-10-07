/**
 * ElderCare - Navbar Component
 * Features: Profile dropdown, Dark mode, RTL/LTR toggle, Mobile menu
 */

const NAVBAR_HTML = `
<header class="site-header" id="main-header">
  <div class="header-container">

    <a href="{{PREFIX}}index.html" class="brand-logo" aria-label="ElderCare Homepage">
      <img src="{{PREFIX}}assets/logo/logo.png" alt="ElderCare logo" data-light-src="{{PREFIX}}assets/logo/logo.png" data-dark-src="{{PREFIX}}assets/logo/logo.png" />
      <div class="brand-text">
        <span class="brand-name">ElderCare</span>
        <span class="brand-tagline">SENIOR DAY CARE &amp; ACTIVITY CENTER</span>
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

      <button class="ctrl-btn ctrl-btn--dir" id="dirToggleBtn" aria-label="Switch to RTL" title="Switch to RTL">
        <svg class="ctrl-icon icon-ltr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 6h18M3 12h12M3 18h9"/>
          <polyline points="17 15 20 18 17 21"/>
        </svg>
        <svg class="ctrl-icon icon-rtl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 6H3M21 12H9M21 18H12"/>
          <polyline points="7 15 4 18 7 21"/>
        </svg>
      </button>

      <div class="profile-wrap" id="profileWrap">
        <button class="ctrl-btn profile-btn" id="profileBtn" aria-label="Open account menu" aria-haspopup="true" aria-expanded="false">
          <svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <div class="profile-dropdown" id="profileDropdown" role="menu" aria-hidden="true">
          <div class="dropdown-header">Account</div>
          <div class="dropdown-divider"></div>
          <a href="{{PREFIX}}login.html" class="dropdown-item" role="menuitem" tabindex="-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Login
          </a>
          <a href="{{PREFIX}}signup.html" class="dropdown-item" role="menuitem" tabindex="-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Sign Up
          </a>
          <a href="{{PREFIX}}user/dashboard.html" class="dropdown-item" role="menuitem" tabindex="-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            User Dashboard
          </a>
          <a href="{{PREFIX}}admin/dashboard.html" class="dropdown-item" role="menuitem" tabindex="-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Admin Dashboard
          </a>
        </div>
      </div>

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
            <span class="brand-tagline">SENIOR DAY CARE &amp; ACTIVITY CENTER</span>
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
      </ul>

      <div class="mobile-section-divider"></div>
      <div class="mobile-section-label">Account</div>
      <ul class="mobile-nav-list">
        <li><a href="{{PREFIX}}login.html"           class="mobile-nav-link">Login</a></li>
        <li><a href="{{PREFIX}}signup.html"          class="mobile-nav-link">Sign Up</a></li>
        <li><a href="{{PREFIX}}user/dashboard.html"  class="mobile-nav-link">User Dashboard</a></li>
        <li><a href="{{PREFIX}}admin/dashboard.html" class="mobile-nav-link">Admin Dashboard</a></li>
      </ul>

      <div class="mobile-section-divider"></div>
      <div class="mobile-controls-row">
        <button class="mobile-ctrl-btn" id="mobileThemeBtn" aria-label="Toggle theme">
          <svg class="ctrl-icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg class="ctrl-icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <span id="mobileThemeLabel">Dark Mode</span>
        </button>
        <button class="mobile-ctrl-btn" id="mobileDirBtn" aria-label="Toggle direction">
          <svg class="ctrl-icon icon-ltr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M3 12h12M3 18h9"/><polyline points="17 15 20 18 17 21"/></svg>
          <svg class="ctrl-icon icon-rtl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 6H3M21 12H9M21 18H12"/><polyline points="7 15 4 18 7 21"/></svg>
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

function initNavbar() {
  _initStickyHeader();
  _initActiveLink();
  _initProfileDropdown();
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

function _initProfileDropdown() {
  const btn      = document.getElementById('profileBtn');
  const dropdown = document.getElementById('profileDropdown');
  if (!btn || !dropdown) return;

  function openDD() {
    dropdown.classList.add('is-open');
    dropdown.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    dropdown.querySelectorAll('.dropdown-item').forEach(el => el.setAttribute('tabindex', '0'));
  }
  function closeDD() {
    dropdown.classList.remove('is-open');
    dropdown.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    dropdown.querySelectorAll('.dropdown-item').forEach(el => el.setAttribute('tabindex', '-1'));
  }

  btn.addEventListener('click', e => { e.stopPropagation(); dropdown.classList.contains('is-open') ? closeDD() : openDD(); });
  document.addEventListener('click', e => { const w = document.getElementById('profileWrap'); if (w && !w.contains(e.target)) closeDD(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDD(); btn.focus(); } });
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
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeMenu));
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
  if (desktopBtn) { desktopBtn.setAttribute('aria-label', isRTL ? 'Switch to LTR' : 'Switch to RTL'); desktopBtn.setAttribute('title', isRTL ? 'Switch to LTR' : 'Switch to RTL'); }
  const mobileLabel = document.getElementById('mobileDirLabel');
  if (mobileLabel) mobileLabel.textContent = isRTL ? 'Switch to LTR' : 'Switch to RTL';
}

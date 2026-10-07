/**
 * ElderCare - Master User Dashboard Logic
 * Handles sidebar toggling, profile dropdown, dynamic page rendering, and interactive dashboard features.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardShell();
  initDashboardHeaderDate();
  initDropdownMenus();
  initMobileSidebar();
  initNotificationToast();
  initLogoutHandlers();
});

/**
 * 1. Initialize Dashboard Shell (Active links & User name)
 */
function initDashboardShell() {
  const data = typeof getDashboardData === 'function' ? getDashboardData() : null;
  const currentPath = window.location.pathname.toLowerCase();

  // Highlight active sidebar navigation item
  const navLinks = document.querySelectorAll('.dash-nav-item a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace('../', '').replace('./', '').toLowerCase();
    if (currentPath.endsWith('/' + cleanHref) || currentPath.endsWith(cleanHref)) {
      link.classList.add('active');
    }
  });

  // Populate User Name & Avatar across topbar & greeting
  if (data && data.user) {
    const user = data.user;
    document.querySelectorAll('.js-user-name, .dash-user-name').forEach(el => {
      if (el.classList.contains('js-user-name') || el.closest('.dash-user-badge')) {
        el.textContent = user.fullName.split(' ')[0] || user.fullName;
      }
    });
    document.querySelectorAll('.js-user-role, .dash-user-role').forEach(el => {
      el.textContent = user.role;
    });
    document.querySelectorAll('.js-user-initial, .dash-user-avatar').forEach(el => {
      el.textContent = user.fullName.charAt(0);
    });
  }
}

/**
 * 2. Dynamic Header Date & Welcome Message
 */
function initDashboardHeaderDate() {
  const dateEl = document.getElementById('dashWelcomeDate');
  const greetingEl = document.getElementById('dashGreetingTime');

  const now = new Date();
  const hours = now.getHours();

  let greeting = 'Good Morning';
  if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else if (hours >= 17) {
    greeting = 'Good Evening';
  }

  if (greetingEl) greetingEl.textContent = greeting;

  if (dateEl) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = `Today • ${now.toLocaleDateString('en-US', options)}`;
  }
}

/**
 * 3. Profile & Notification Dropdown Toggles
 */
function initDropdownMenus() {
  // User Profile Dropdown
  const profileTriggers = document.querySelectorAll('#dashProfileBtn, #dashUserBadge, .dash-user-badge');

  profileTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentWrap = btn.closest('.dash-user-badge-wrap') || btn.parentElement;
      const targetMenu = parentWrap.querySelector('.dash-dropdown') || document.getElementById('dashUserDropdown') || document.getElementById('dashProfileDropdown');
      
      if (targetMenu) {
        const isOpen = targetMenu.classList.contains('is-open');
        closeAllDropdowns();
        if (!isOpen) {
          targetMenu.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // Notifications Dropdown
  const notifTriggers = document.querySelectorAll('#dashNotifBtn, .dash-notif-btn');

  notifTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentWrap = btn.parentElement;
      const targetMenu = parentWrap.querySelector('.dash-dropdown') || document.getElementById('dashNotifDropdown');
      
      if (targetMenu) {
        const isOpen = targetMenu.classList.contains('is-open');
        closeAllDropdowns();
        if (!isOpen) {
          targetMenu.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dash-dropdown') && !e.target.closest('#dashProfileBtn') && !e.target.closest('#dashUserBadge') && !e.target.closest('#dashNotifBtn')) {
      closeAllDropdowns();
    }
  });

  // Close dropdowns on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.dash-dropdown').forEach(d => d.classList.remove('is-open'));
  document.querySelectorAll('[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

/**
 * 4. Mobile Sidebar Slide-out Drawer
 */
function initMobileSidebar() {
  const toggleBtns = document.querySelectorAll('#dashSidebarToggle, .dash-sidebar-toggle-btn');
  const sidebar = document.getElementById('dashSidebar');
  const overlay = document.getElementById('dashOverlay');
  const closeBtns = document.querySelectorAll('#dashSidebarClose, .dash-sidebar-close-btn');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('is-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });
}

/**
 * 5. Toast Notification System
 */
function initNotificationToast() {
  let toastContainer = document.getElementById('dashToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'dashToastContainer';
    toastContainer.className = 'dash-toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showDashboardToast(message, type = 'success') {
  initNotificationToast();
  const container = document.getElementById('dashToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `dash-toast ${type}`;
  toast.innerHTML = `
    <div class="dash-toast-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <span class="dash-toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Global aliases for toasts
window.showDashboardToast = showDashboardToast;
window.showToast = showDashboardToast;

/**
 * 6. Logout Handlers
 */
function initLogoutHandlers() {
  document.querySelectorAll('#dashLogoutBtn, #dashDropLogout, .dash-logout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleDashboardLogout();
    });
  });
}

function handleDashboardLogout() {
  if (confirm("Are you sure you want to sign out of the family dashboard?")) {
    showDashboardToast("Signing out...");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 600);
  }
}
window.handleDashboardLogout = handleDashboardLogout;


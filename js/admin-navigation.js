/**
 * ElderCare - Admin Navigation & Shell Controller
 * Controls Sidebar, Collapsible states, Topbar Dropdowns, Global Search, Modals, and Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminNavigation();
  initAdminDropdowns();
  initGlobalSearch();
  highlightActiveNavLink();
});

/**
 * Initializes sidebar collapse and mobile drawer
 */
function initAdminNavigation() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('adminOverlay');
  const mobileToggle = document.getElementById('adminMobileMenuBtn');
  const sidebarClose = document.getElementById('adminSidebarClose');
  const collapseToggle = document.getElementById('adminSidebarCollapseBtn');

  if (!sidebar) return;

  // Mobile Drawer Open
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileSidebar();
    });
  }

  // Close button inside sidebar
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      closeMobileSidebar();
    });
  }

  // Backdrop click closes drawer
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMobileSidebar();
    });
  }

  // Desktop sidebar collapse / expand
  if (collapseToggle) {
    // Check saved state
    const isCollapsed = localStorage.getItem('eldercare-admin-collapsed') === 'true';
    if (isCollapsed && window.innerWidth > 992) {
      document.body.classList.add('sidebar-collapsed');
    }

    collapseToggle.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapsed');
      const nowCollapsed = document.body.classList.contains('sidebar-collapsed');
      localStorage.setItem('eldercare-admin-collapsed', nowCollapsed);
    });
  }

  // Close mobile drawer on navigation click
  document.querySelectorAll('.admin-nav-item a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeMobileSidebar();
      }
    });
  });

  // Escape key closes mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeMobileSidebar();
    }
  });
}

function openMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('adminOverlay');
  const mobileToggle = document.getElementById('adminMobileMenuBtn');

  if (sidebar) sidebar.classList.add('is-open');
  if (overlay) overlay.classList.add('is-open');
  if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('admin-mobile-open');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('adminOverlay');
  const mobileToggle = document.getElementById('adminMobileMenuBtn');

  if (sidebar) sidebar.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-open');
  if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('admin-mobile-open');
}

/**
 * Highlights the active sidebar link based on current page path
 */
function highlightActiveNavLink() {
  let path = window.location.pathname.replace(/\\/g, '/');
  let page = path.substring(path.lastIndexOf('/') + 1) || 'dashboard.html';

  // Map sub-pages to their parent category
  if (page === 'enrollment-details.html') page = 'enrollments.html';
  if (page === 'service-details.html') page = 'services.html';

  document.querySelectorAll('.admin-nav-item a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === page || href.endsWith('/' + page))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Manages Profile and Notification dropdowns
 */
function initAdminDropdowns() {
  const profileBtn = document.getElementById('adminProfileBtn');
  const profileDropdown = document.getElementById('adminProfileDropdown');
  const notifBtn = document.getElementById('adminNotifBtn');
  const notifDropdown = document.getElementById('adminNotifDropdown');

  function closeAllDropdowns() {
    if (profileDropdown) profileDropdown.classList.remove('is-open');
    if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    if (notifDropdown) notifDropdown.classList.remove('is-open');
    if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
  }

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = profileDropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) {
        profileDropdown.classList.add('is-open');
        profileBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = notifDropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) {
        notifDropdown.classList.add('is-open');
        notifBtn.setAttribute('aria-expanded', 'true');
        renderTopbarNotifications();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
      profileDropdown.classList.remove('is-open');
      if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    }
    if (notifDropdown && !notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
      notifDropdown.classList.remove('is-open');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // Render initial notif badge
  renderNotifBadge();
}

function renderNotifBadge() {
  const data = typeof getAdminData === 'function' ? getAdminData() : null;
  const badge = document.getElementById('adminNotifBadge');
  if (!badge || !data || !data.notifications) return;

  const unreadCount = data.notifications.filter(n => !n.read).length;
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

function renderTopbarNotifications() {
  const listEl = document.getElementById('topbarNotifList');
  if (!listEl) return;

  const data = typeof getAdminData === 'function' ? getAdminData() : null;
  if (!data || !data.notifications || data.notifications.length === 0) {
    listEl.innerHTML = `<div class="admin-dropdown-empty">No new notifications</div>`;
    return;
  }

  const itemsHtml = data.notifications.slice(0, 4).map(n => `
    <a href="${n.link || 'notifications.html'}" class="admin-dropdown-notif-item ${!n.read ? 'unread' : ''}">
      <div class="admin-notif-dot-small" ${n.read ? 'style="opacity:0;"' : ''}></div>
      <div class="admin-dropdown-notif-content">
        <span class="admin-notif-item-title">${escapeHtml(n.title)}</span>
        <span class="admin-notif-item-msg">${escapeHtml(n.message)}</span>
        <span class="admin-notif-item-time">${escapeHtml(n.time)}</span>
      </div>
    </a>
  `).join('');

  listEl.innerHTML = itemsHtml;
}

/**
 * Global Search across Users, Seniors, Enrollments, Services, Reports, Messages
 */
function initGlobalSearch() {
  const searchInput = document.getElementById('adminGlobalSearchInput');
  const searchDropdown = document.getElementById('adminGlobalSearchResults');
  const searchWrapper = document.getElementById('adminSearchWrapper');

  if (!searchInput || !searchDropdown) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (q.length < 2) {
      searchDropdown.classList.remove('is-open');
      searchDropdown.innerHTML = '';
      return;
    }

    const data = typeof getAdminData === 'function' ? getAdminData() : null;
    if (!data) return;

    const results = [];

    // Search Seniors
    data.seniors.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.serviceName.toLowerCase().includes(q) || s.familyName.toLowerCase().includes(q)) {
        results.push({
          category: 'Seniors',
          title: s.name,
          subtitle: `${s.serviceName} • Age ${s.age}`,
          link: `seniors.html?search=${encodeURIComponent(s.name)}`
        });
      }
    });

    // Search Users / Families
    data.users.forEach(u => {
      if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.seniorName.toLowerCase().includes(q)) {
        results.push({
          category: 'Family Users',
          title: u.name,
          subtitle: `${u.email} • Senior: ${u.seniorName}`,
          link: `users.html?search=${encodeURIComponent(u.name)}`
        });
      }
    });

    // Search Enrollments
    data.enrollments.forEach(en => {
      if (en.id.toLowerCase().includes(q) || en.seniorName.toLowerCase().includes(q) || en.serviceName.toLowerCase().includes(q)) {
        results.push({
          category: 'Enrollments',
          title: `${en.id} - ${en.seniorName}`,
          subtitle: `${en.serviceName} • ${en.status}`,
          link: `enrollment-details.html?id=${en.id}`
        });
      }
    });

    // Search Services
    data.services.forEach(srv => {
      if (srv.title.toLowerCase().includes(q) || srv.category.toLowerCase().includes(q)) {
        results.push({
          category: 'Services',
          title: srv.title,
          subtitle: `${srv.category} • ₹${srv.price.toLocaleString('en-IN')}/mo`,
          link: `service-details.html?id=${srv.id}`
        });
      }
    });

    // Search Reports
    data.reports.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)) {
        results.push({
          category: 'Reports',
          title: r.title,
          subtitle: `${r.type} • ${r.date}`,
          link: `reports.html?search=${encodeURIComponent(r.title)}`
        });
      }
    });

    // Search Messages
    data.messages.forEach(m => {
      if (m.familyName.toLowerCase().includes(q) || m.preview.toLowerCase().includes(q)) {
        results.push({
          category: 'Messages',
          title: m.familyName,
          subtitle: m.preview,
          link: `messages.html?id=${m.id}`
        });
      }
    });

    if (results.length === 0) {
      searchDropdown.innerHTML = `
        <div class="admin-search-empty">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>No matches found for "<strong>${escapeHtml(q)}</strong>"</span>
        </div>
      `;
    } else {
      const grouped = {};
      results.forEach(r => {
        if (!grouped[r.category]) grouped[r.category] = [];
        grouped[r.category].push(r);
      });

      let html = '';
      for (const [cat, items] of Object.entries(grouped)) {
        html += `<div class="admin-search-cat-header">${cat}</div>`;
        items.slice(0, 3).forEach(item => {
          html += `
            <a href="${item.link}" class="admin-search-item">
              <span class="admin-search-item-title">${escapeHtml(item.title)}</span>
              <span class="admin-search-item-sub">${escapeHtml(item.subtitle)}</span>
            </a>
          `;
        });
      }
      searchDropdown.innerHTML = html;
    }

    searchDropdown.classList.add('is-open');
  });

  document.addEventListener('click', (e) => {
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      searchDropdown.classList.remove('is-open');
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchDropdown.classList.remove('is-open');
      searchInput.blur();
    }
  });
}

/**
 * Universal Modal System
 */
function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('is-active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus first input if available
  const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

function closeAdminModal(modalId) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (!modal) return;

  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

// Global listener for modal dismiss buttons and backdrop
document.addEventListener('click', (e) => {
  if (e.target.matches('.admin-modal-backdrop') || e.target.closest('[data-modal-close]')) {
    const modal = e.target.closest('.admin-modal');
    if (modal) closeAdminModal(modal);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.admin-modal.is-active');
    if (activeModal) closeAdminModal(activeModal);
  }
});

/**
 * Toast Notification System
 */
function showAdminToast(message, type = 'success') {
  let toastContainer = document.getElementById('adminToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'adminToastContainer';
    toastContainer.className = 'admin-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else {
    iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  }

  toast.innerHTML = `
    <div class="admin-toast-icon">${iconSvg}</div>
    <div class="admin-toast-message">${escapeHtml(message)}</div>
    <button class="admin-toast-close" aria-label="Dismiss">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Trigger reveal
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  const removeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  };

  toast.querySelector('.admin-toast-close').addEventListener('click', removeToast);
  setTimeout(removeToast, 4000);
}

/**
 * Helper to escape HTML characters safely
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Handle Admin Logout
 */
function handleAdminLogout() {
  if (confirm("Are you sure you want to sign out from the ElderCare Admin Portal?")) {
    showAdminToast("Signed out successfully. Redirecting to home...", "info");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 600);
  }
}

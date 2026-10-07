/**
 * ElderCare - Admin Theme & Direction Controller
 * Synchronizes Light/Dark Mode and RTL/LTR Direction with LocalStorage.
 * Seamlessly integrates with the public website and user dashboard settings.
 */

(function initAdminThemeImmediate() {
  const currentTheme = localStorage.getItem('eldercare-theme') || 'light';
  const currentDir = localStorage.getItem('eldercare-direction') || 'ltr';

  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('dir', currentDir);

  document.querySelectorAll('img[alt="ElderCare logo"]').forEach(img => {
    const isDark = currentTheme === 'dark';
    const lightSrc = img.getAttribute('data-light-src') || img.src;
    const darkSrc = img.getAttribute('data-dark-src') || lightSrc;
    img.src = isDark ? darkSrc : lightSrc;
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  setupAdminThemeControls();
});

function setupAdminThemeControls() {
  const themeBtns = document.querySelectorAll('#adminThemeToggleBtn, .admin-theme-toggle, #adminThemeBtn');
  const dirBtns = document.querySelectorAll('#adminDirToggleBtn, .admin-dir-toggle, #adminDirBtn');

  const updateThemeUI = (theme) => {
    const isDark = theme === 'dark';
    themeBtns.forEach(btn => {
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });

    const settingsThemeToggle = document.getElementById('settingsThemeToggle');
    if (settingsThemeToggle) {
      settingsThemeToggle.checked = isDark;
    }
  };

  const updateDirUI = (dir) => {
    const isRTL = dir === 'rtl';
    dirBtns.forEach(btn => {
      btn.setAttribute('title', isRTL ? 'Switch to LTR' : 'Switch to RTL');
      btn.setAttribute('aria-label', isRTL ? 'Switch to LTR' : 'Switch to RTL');
    });

    const settingsRtlToggle = document.getElementById('settingsRtlToggle');
    if (settingsRtlToggle) {
      settingsRtlToggle.checked = isRTL;
    }
  };

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  updateThemeUI(currentTheme);
  updateDirUI(currentDir);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('eldercare-theme', next);
      document.querySelectorAll('img[alt="ElderCare logo"]').forEach(img => {
        const lightSrc = img.getAttribute('data-light-src') || img.src;
        const darkSrc = img.getAttribute('data-dark-src') || lightSrc;
        img.src = next === 'dark' ? darkSrc : lightSrc;
      });
      updateThemeUI(next);

      if (typeof showAdminToast === 'function') {
        showAdminToast(`Theme switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      }
    });
  });

  dirBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('eldercare-direction', next);
      updateDirUI(next);

      if (typeof showAdminToast === 'function') {
        showAdminToast(`Layout direction switched to ${next.toUpperCase()}`, 'info');
      }
    });
  });
}

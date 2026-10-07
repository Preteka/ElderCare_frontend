/**
 * ElderCare - Dashboard Theme & Direction Controller
 * Synchronizes light/dark mode and RTL/LTR with localStorage and public website settings.
 */

(function initDashboardTheme() {
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
  setupDashboardControls();
});

function setupDashboardControls() {
  const themeBtns = document.querySelectorAll('#dashThemeToggleBtn, #dashThemeBtn, .dash-theme-toggle');
  const dirBtns = document.querySelectorAll('#dashDirToggleBtn, #dashDirBtn, .dash-dir-toggle');

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';

  themeBtns.forEach(btn => {
    btn.setAttribute('title', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
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
      themeBtns.forEach(b => {
        b.setAttribute('title', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        b.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });

      // Also sync settings page checkbox if it exists
      const settingsThemeSwitch = document.getElementById('settingsThemeToggle');
      if (settingsThemeSwitch) {
        settingsThemeSwitch.checked = (next === 'dark');
      }

      if (typeof showDashboardToast === 'function') {
        showDashboardToast(`Theme switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
      }
    });
  });

  dirBtns.forEach(btn => {
    btn.setAttribute('title', currentDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    btn.setAttribute('aria-label', currentDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('eldercare-direction', next);
      dirBtns.forEach(b => {
        b.setAttribute('title', next === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
        b.setAttribute('aria-label', next === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      });

      // Also sync settings page checkbox if it exists
      const settingsRtlSwitch = document.getElementById('settingsRtlToggle');
      if (settingsRtlSwitch) {
        settingsRtlSwitch.checked = (next === 'rtl');
      }

      if (typeof showDashboardToast === 'function') {
        showDashboardToast(`Layout direction switched to ${next.toUpperCase()}`);
      }
    });
  });
}


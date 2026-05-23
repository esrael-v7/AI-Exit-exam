/**
 * GLOBAL LIGHT/DARK THEME CONTROLLER
 * St. Mary's University Exit Exam AI-Prep System
 */

(function () {
  // Read theme from localStorage or fallback to default 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const updateIcon = (theme) => {
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Dark Mode';
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Light Mode';
    }
  };

  // Sync initial button icon
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateIcon(currentTheme);

  // Bind toggle click listener
  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateIcon(nextTheme);
  });
});

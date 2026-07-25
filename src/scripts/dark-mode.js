// src/scripts/dark-mode.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('[data-theme-toggle]');
  
  toggleButton?.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    if (isDark) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  });
});

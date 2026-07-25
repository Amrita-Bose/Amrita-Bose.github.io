// src/scripts/dark-mode.js

function forceIOSRepaint() {
  const html = document.documentElement;
  const body = document.body;

  // Force style and layout recalculation on WebKit
  void html.offsetHeight;
  if (body) {
    void body.offsetHeight;
    // Briefly apply translateZ to force WebKit GPU compositor layer invalidation on iOS
    body.style.transform = 'translateZ(0)';
    requestAnimationFrame(() => {
      body.style.transform = '';
    });
  }

  // Dispatch scroll event so GPU composited background layers and scroll observers repaint immediately
  window.dispatchEvent(new Event('scroll'));
}

function updateTheme(isDark) {
  const html = document.documentElement;
  const body = document.body;
  const newTheme = isDark ? 'dark' : 'light';

  if (isDark) {
    html.classList.add('dark');
    body?.classList.add('dark');
    html.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark');
    body?.classList.remove('dark');
    html.style.colorScheme = 'light';
  }

  try {
    localStorage.setItem('theme', newTheme);
  } catch (_) {}

  forceIOSRepaint();
}

export function initDarkMode() {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  // Ensure body matches html dark state initially
  if (document.documentElement.classList.contains('dark')) {
    document.body?.classList.add('dark');
  } else {
    document.body?.classList.remove('dark');
  }

  toggleButtons.forEach(button => {
    if (button.dataset.darkBound === 'true') return;
    button.dataset.darkBound = 'true';

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = !document.documentElement.classList.contains('dark');
      updateTheme(isDark);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}

document.addEventListener('astro:page-load', initDarkMode);


// src/scripts/dark-mode.js

function updateTheme(isDark) {
  const html = document.documentElement;
  const body = document.body;
  const header = document.querySelector('header');
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  const newTheme = isDark ? 'dark' : 'light';

  // 1. Temporarily disable transitions to prevent iOS WebKit GPU layer rendering freezes
  html.classList.add('theme-switching');

  // 2. Toggle dark class across html, body, and header
  if (isDark) {
    html.classList.add('dark');
    body?.classList.add('dark');
    header?.classList.add('dark');
    html.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark');
    body?.classList.remove('dark');
    header?.classList.remove('dark');
    html.style.colorScheme = 'light';
  }

  // 3. Explicitly update icon visibility inside buttons to bypass WebKit fixed backdrop-filter SVG caching bug
  toggleButtons.forEach(button => {
    const svgs = button.querySelectorAll('svg');
    if (svgs.length >= 2) {
      // Index 0 is Sun (visible in dark mode), Index 1 is Moon (visible in light mode)
      svgs[0].style.display = isDark ? 'block' : 'none';
      svgs[1].style.display = isDark ? 'none' : 'block';
    }
  });

  try {
    localStorage.setItem('theme', newTheme);
  } catch (_) {}

  // 4. Force synchronous WebKit layout reflow
  void html.offsetHeight;
  if (body) void body.offsetHeight;
  if (header) void header.offsetHeight;

  // 5. Force iOS Safari GPU compositor layer invalidation for fixed header and background
  if (header) {
    header.style.transform = 'translateZ(0)';
  }
  if (body) {
    body.style.transform = 'translateZ(0)';
  }

  // 6. Dispatch scroll event to update scrollbar/observers and trigger tile re-compositing
  window.dispatchEvent(new Event('scroll'));

  // 7. Reset temporary transform styles and remove transition suppression lock on next frame
  requestAnimationFrame(() => {
    if (header) header.style.transform = '';
    if (body) body.style.transform = '';
    requestAnimationFrame(() => {
      html.classList.remove('theme-switching');
    });
  });
}

export function initDarkMode() {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  const isDark = document.documentElement.classList.contains('dark');

  // Ensure initial body & icon state matches html dark state
  if (isDark) {
    document.body?.classList.add('dark');
  } else {
    document.body?.classList.remove('dark');
  }

  toggleButtons.forEach(button => {
    const svgs = button.querySelectorAll('svg');
    if (svgs.length >= 2) {
      svgs[0].style.display = isDark ? 'block' : 'none';
      svgs[1].style.display = isDark ? 'none' : 'block';
    }

    if (button.dataset.darkBound === 'true') return;
    button.dataset.darkBound = 'true';

    const handleToggle = (e) => {
      e.preventDefault();
      const currentIsDark = document.documentElement.classList.contains('dark');
      updateTheme(!currentIsDark);
    };

    button.addEventListener('click', handleToggle);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
  initDarkMode();
}

document.addEventListener('astro:page-load', initDarkMode);



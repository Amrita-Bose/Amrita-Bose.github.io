// src/scripts/nav-indicator.js

document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.querySelector('[data-nav-indicator]');
  const navContainer = document.querySelector('nav[aria-label="Main Navigation"]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!indicator || !navContainer) return;

  function updateIndicator(activeLink) {
    if (!activeLink) {
      indicator.classList.remove('opacity-100');
      indicator.classList.add('opacity-0');
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navContainer.getBoundingClientRect();

    // Position container indicator relative to its parent nav bounds
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.height = `${linkRect.height}px`;
    indicator.style.left = `${linkRect.left - navRect.left}px`;
    indicator.style.top = `${linkRect.top - navRect.top}px`;

    // Make capsule visible
    indicator.classList.remove('opacity-0');
    indicator.classList.add('opacity-100');
  }

  // Set up MutationObserver to watch for class changes on nav links
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const el = mutation.target;
        if (el.classList.contains('active')) {
          updateIndicator(el);
        }
      }
    });
  });

  navLinks.forEach(link => {
    observer.observe(link, { attributes: true });

    // Defocus the link after standard transition finishes to fade out focus outline (delayed by 1300ms total)
    link.addEventListener('click', () => {
      setTimeout(() => {
        link.blur();
      }, 700); // 1300ms gives time to see highlight focus ring before fade out
    });
  });

  // Window resize support
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      updateIndicator(activeLink);
    }
  });

  // Initial update
  const initialActive = document.querySelector('.nav-link.active');
  if (initialActive) {
    setTimeout(() => updateIndicator(initialActive), 150);
  }
});

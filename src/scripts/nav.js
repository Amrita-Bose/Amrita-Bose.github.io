// src/scripts/nav.js

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('[data-hamburger]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const closeIcon = hamburger?.querySelector('[data-menu-icon="close"]');
  const openIcon = hamburger?.querySelector('[data-menu-icon="open"]');

  function toggleMenu(forceClose = false) {
    if (!hamburger || !navMenu) return;
    
    const isExpanded = forceClose ? true : (hamburger.getAttribute('aria-expanded') === 'true');
    const newState = !isExpanded;
    
    hamburger.setAttribute('aria-expanded', String(newState));
    
    if (newState) {
      navMenu.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      openIcon?.classList.remove('hidden');
    } else {
      navMenu.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      openIcon?.classList.add('hidden');
    }
  }

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.classList.contains('hidden') && !navMenu.contains(e.target) && !hamburger?.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Escape key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && !navMenu.classList.contains('hidden')) {
      toggleMenu(true);
      hamburger?.focus();
    }
  });
});

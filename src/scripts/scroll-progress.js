// src/scripts/scroll-progress.js

document.addEventListener('DOMContentLoaded', () => {
  function initScrollProgress() {
    const indicator = document.querySelector('[data-scroll-indicator]');
    if (!indicator) return;

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progression percentage
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      indicator.style.width = `${progress}%`;
    }

    // Bind scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Run initial alignment calculation
    handleScroll();
  }

  // Bind initial execution
  initScrollProgress();

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', initScrollProgress);
});

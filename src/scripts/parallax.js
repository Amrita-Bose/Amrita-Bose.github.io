// src/scripts/parallax.js

document.addEventListener('DOMContentLoaded', () => {
  function initParallaxHeaders() {
    const headers = document.querySelectorAll('[data-parallax-header]');

    if (headers.length === 0) return;

    function handleScroll() {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      headers.forEach(header => {
        const rect = header.getBoundingClientRect();
        
        // Calculate vertical center of the header element
        const elementCenter = rect.top + rect.height / 2;
        
        // Calculate offset relative to viewport center
        const offsetFromCenter = elementCenter - viewportCenter;

        // Map scroll distance to moderate horizontal shift (counter-scroll effect)
        const translateX = offsetFromCenter * -0.15;

        // Limit translation bounds to keep text within readable viewport focus
        const clampedTranslateX = Math.max(-120, Math.min(120, translateX));

        header.style.setProperty('--header-parallax-x', `${clampedTranslateX}px`);
      });
    }

    // Bind scroll actions
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Run initial alignment calculation
    handleScroll();
  }

  // Bind initial execution
  initParallaxHeaders();

  // Support Astro router page transitions
  document.addEventListener('astro:page-load', initParallaxHeaders);
});

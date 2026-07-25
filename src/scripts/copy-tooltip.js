// src/scripts/copy-tooltip.js

document.addEventListener('DOMContentLoaded', () => {
  // Create tooltip element dynamically on the page (matching page glassmorphism theme)
  const tooltip = document.createElement('div');
  tooltip.className = 'fixed z-[9999] px-3 py-1.5 text-[11px] font-semibold rounded-lg pointer-events-none opacity-0 transition-all duration-200 translate-y-1 scale-95 bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm';
  tooltip.textContent = 'Click to Copy';
  document.body.appendChild(tooltip);

  let activeElement = null;
  let isCopiedState = false;

  function showTooltip(el) {
    if (isCopiedState) return;
    activeElement = el;
    tooltip.textContent = 'Click to Copy';
    
    // Position tooltip centered above the element
    const rect = el.getBoundingClientRect();
    
    // Briefly remove opacity class to calculate offset width and height correctly
    tooltip.classList.remove('opacity-0');
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    tooltip.classList.add('opacity-0');
    
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltipWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltipHeight - 8}px`;
    
    // Fade in
    tooltip.classList.remove('opacity-0', 'translate-y-1', 'scale-95');
    tooltip.classList.add('opacity-100', 'translate-y-0', 'scale-100');
    el.style.cursor = 'copy';
  }

  function hideTooltip() {
    if (isCopiedState) return;
    activeElement = null;
    tooltip.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    tooltip.classList.add('opacity-0', 'translate-y-1', 'scale-95');
  }

  function copyText(el) {
    let textToCopy = '';
    if (el.tagName === 'A' && el.href.startsWith('mailto:')) {
      textToCopy = el.href.replace(/^mailto:/i, '').trim();
    } else if (el.hasAttribute('data-bibtex')) {
      textToCopy = el.getAttribute('data-bibtex');
    }

    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      // Success feedback animation (using theme's violet accent)
      isCopiedState = true;
      tooltip.innerHTML = '<span class="text-violet-600 dark:text-violet-400 font-extrabold mr-1">✓</span> Copied!';
      
      // Pop bounce animation & violet glow aura
      tooltip.classList.add('scale-105', 'border-violet-500/50', 'dark:border-violet-400/50', 'shadow-[0_0_12px_rgba(139,92,246,0.35)]');
      
      setTimeout(() => {
        tooltip.classList.remove('scale-105', 'border-violet-500/50', 'dark:border-violet-400/50', 'shadow-[0_0_12px_rgba(139,92,246,0.35)]');
        isCopiedState = false;
        
        // If mouse is no longer hovering, hide tooltip
        if (activeElement !== el) {
          hideTooltip();
        } else {
          // Reset to default message
          tooltip.textContent = 'Click to Copy';
        }
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  function bindListeners() {
    const copyTargets = document.querySelectorAll('a[href^="mailto:"], button[data-bibtex-btn]');
    
    copyTargets.forEach(target => {
      target.style.cursor = 'copy';
      
      // Prevent duplicated listeners
      target.removeEventListener('mouseenter', handleMouseEnter);
      target.removeEventListener('mouseleave', handleMouseLeave);
      target.removeEventListener('click', handleClick);
      
      target.addEventListener('mouseenter', handleMouseEnter);
      target.addEventListener('mouseleave', handleMouseLeave);
      target.addEventListener('click', handleClick);
    });
  }

  function handleMouseEnter(e) {
    showTooltip(e.currentTarget);
  }

  function handleMouseLeave(e) {
    const el = e.currentTarget;
    if (isCopiedState) {
      activeElement = null;
      return;
    }
    hideTooltip();
  }

  function handleClick(e) {
    const el = e.currentTarget;
    if (el.hasAttribute('data-bibtex-btn')) {
      e.preventDefault();
    }
    copyText(el);
  }

  // Bind initial elements
  bindListeners();
  
  // Re-bind targets dynamically for SPA router transitions
  document.addEventListener('astro:page-load', bindListeners);
});

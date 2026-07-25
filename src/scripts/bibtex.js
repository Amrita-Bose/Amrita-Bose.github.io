// src/scripts/bibtex.js

document.addEventListener('DOMContentLoaded', () => {
  const bibtexButtons = document.querySelectorAll('[data-bibtex-btn]');

  bibtexButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const bibtexString = button.getAttribute('data-bibtex');
      if (!bibtexString) return;

      const originalContent = button.innerHTML;
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(bibtexString);
          showFeedback(button, 'Copied!', originalContent);
        } else {
          // Fallback using legacy execCommand
          const textArea = document.createElement('textarea');
          textArea.value = bibtexString;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (success) {
            showFeedback(button, 'Copied!', originalContent);
          } else {
            showFeedback(button, 'Failed', originalContent);
          }
        }
      } catch (err) {
        showFeedback(button, 'Failed', originalContent);
      }
    });
  });

  function showFeedback(button, text, originalContent) {
    // Attempt to locate the text node inside the button to preserve the SVG icon
    const textNode = Array.from(button.childNodes).find(
      node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()
    );
    
    if (textNode) {
      const originalTextValue = textNode.nodeValue;
      textNode.nodeValue = ` ${text}`;
      setTimeout(() => {
        textNode.nodeValue = originalTextValue;
      }, 2000);
    } else {
      // Direct text replacement fallback
      button.textContent = text;
      setTimeout(() => {
        button.innerHTML = originalContent;
      }, 2000);
    }
  }
});

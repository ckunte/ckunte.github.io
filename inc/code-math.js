function loadSyntaxAndMathOnDemand() {
  let needsHighlight = false;
  let needsKatex = false;

  // Check for code blocks for highlight.js
  const codeBlocks = document.querySelectorAll('pre code');
  if (codeBlocks.length > 0) {
    needsHighlight = true;
  }

  // Check for math delimiters for KaTeX
  const bodyText = document.body.textContent;
  if (bodyText.includes('$') || bodyText.includes('$$')) {
    needsKatex = true;
  }

  if (needsHighlight && needsKatex) {
    // Load both highlight.js and KaTeX
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css'); // Optional: for better code block styling
    loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css');
    loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js', () => {
      loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js', () => {
        renderMath();
      });
    });
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js', () => {
      hljs.highlightAll();
    });
  } else if (needsHighlight) {
    // Load only highlight.js
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js', () => {
      hljs.highlightAll();
    });
  } else if (needsKatex) {
    // Load only KaTeX
    loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css');
    loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js', () => {
      loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js', () => {
        renderMath();
      });
    });
  }
}

function loadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadScript(url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.defer = true; // Add the defer attribute
  script.onload = callback;
  document.head.appendChild(script);
}

function renderMath() {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ],
    throwOnError: false
  });
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadSyntaxAndMathOnDemand);
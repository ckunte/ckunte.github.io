const KATEX_VERSION = '0.18.1';
const HLJS_VERSION = '11.11.1';

const KATEX_CSS = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`;
const KATEX_JS = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`;
const KATEX_AUTORENDER_JS = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/contrib/auto-render.min.js`;
const HLJS_JS = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${HLJS_VERSION}/highlight.min.js`;
const MARKDOWN_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css';

function loadCSS(url) {
  if (document.querySelector(`link[href="${url}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadScript(url) {
  const existing = document.querySelector(`script[src="${url}"]`);
  if (existing) {
    return existing.dataset.loaded === 'true'
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error(`Failed to load ${url}`)));
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });
}

function renderMath() {
  if (typeof renderMathInElement !== 'function') return;
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

async function loadHighlightJS() {
  loadCSS(MARKDOWN_CSS);
  await loadScript(HLJS_JS);
  if (typeof hljs !== 'undefined') hljs.highlightAll();
}

async function loadKaTeX() {
  loadCSS(KATEX_CSS);
  await loadScript(KATEX_JS);
  await loadScript(KATEX_AUTORENDER_JS);
  renderMath();
}

async function loadSyntaxAndMathOnDemand() {
  const needsHighlight = document.querySelector('pre code') !== null;
  const bodyText = document.body.textContent;
  const needsKatex = bodyText.includes('$') || /\\\(|\\\[/.test(bodyText);

  const tasks = [];
  if (needsHighlight) tasks.push(loadHighlightJS());
  if (needsKatex) tasks.push(loadKaTeX());

  const results = await Promise.allSettled(tasks);
  results.forEach(r => {
    if (r.status === 'rejected') console.error(r.reason);
  });
}

document.addEventListener('DOMContentLoaded', loadSyntaxAndMathOnDemand);

// Check if the page contains any <pre> tags
if (document.querySelectorAll('pre').length > 0) {
  // Create a new <script> tag to load highlight.js
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js'; // Or your local path
  script.onload = function () {
    // Once highlight.js is loaded, apply syntax highlighting to all <pre> <code> blocks
    hljs.highlightAll();
  };
  document.head.appendChild(script);
}

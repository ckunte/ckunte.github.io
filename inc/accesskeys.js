document.addEventListener("DOMContentLoaded", () => {
  const keys = {
    'a[href="#papers"]': "a",
    'a[href="#proj"]':   "p",
    'a[href="#notes"]':  "n",
  };
  for (const [selector, key] of Object.entries(keys)) {
    const el = document.querySelector(selector);
    if (el) el.accessKey = key;
  }
});

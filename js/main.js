document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  });

  
  const switcher = document.getElementById('lang-switcher');

  // Set initial dropdown value
  switcher.value = window.location.pathname.startsWith('/arabic/') ? 'arabic/' : '';
  
  switcher.addEventListener('change', function() {
    const selectedDir = this.value;
    const currentPath = window.location.pathname;
    const currentDir = currentPath.startsWith('/arabic/') ? 'arabic/' : '';
  
    // Exit if same language selected
    if (selectedDir === currentDir) return;
  
    // Split URL into meaningful parts
    const pathParts = currentPath.split('/').filter(p => p !== ''); // Remove empty elements
  
    // Modify path based on selection
    if (selectedDir === 'arabic/') {
      // Add Arabic directory prefix if not present
      if (pathParts[0] !== 'arabic') pathParts.unshift('arabic');
    } else {
      // Remove Arabic directory prefix if present
      if (pathParts[0] === 'arabic') pathParts.shift();
    }
  
    // Rebuild new URL
    const newPath = '/' + pathParts.join('/');
    window.location.href = newPath;
  });
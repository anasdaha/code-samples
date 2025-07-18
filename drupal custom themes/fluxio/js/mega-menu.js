document.addEventListener('DOMContentLoaded', function() {
  // Get all menu items that have dropdowns
  const menuItems = document.querySelectorAll('.ap-mega-menu__item');
  
  // Helper function to close all dropdowns
  function closeAllDropdowns() {
    menuItems.forEach(item => {
      item.setAttribute('aria-expanded', 'false');
      const dropdown = item.querySelector('.ap-mega-menu__dropdown');
      const toggle = item.querySelector('.ap-mega-menu__toggle');
      if (dropdown) {
        dropdown.setAttribute('aria-hidden', 'true');
      }
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  menuItems.forEach(item => {
    const toggle = item.querySelector('.ap-mega-menu__toggle');
    const dropdown = item.querySelector('.ap-mega-menu__dropdown');
    
    if (toggle && dropdown) {
      // Handle toggle button clicks
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isCurrentlyExpanded = item.getAttribute('aria-expanded') === 'true';
        
        // First, close all dropdowns
        closeAllDropdowns();
        
        // Then, if the clicked item wasn't already expanded, open it
        if (!isCurrentlyExpanded) {
          item.setAttribute('aria-expanded', 'true');
          dropdown.setAttribute('aria-hidden', 'false');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ap-mega-menu')) {
      closeAllDropdowns();
    }
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });
  
});

  
const targets = document.querySelectorAll('[data-sticky]');
const targetScroll = document.querySelectorAll('[data-stuck]');

targets.forEach((target) => {
  // Add a scroll event listener to the window
  window.addEventListener('scroll', function() {
    // Get the current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // Check if the scroll position is greater than or equal to 100 pixels
    if (scrollPosition >= 400) {
      // Add the data-sticky attribute to the target div
      target.setAttribute('data-sticky', 'true');
    } else {
      // If the scroll position is less than 100 pixels, remove the data-sticky attribute
      target.removeAttribute('data-sticky');
    }
  });
});

targetScroll.forEach((target) => {
  // Add a scroll event listener to the window
  window.addEventListener('scroll', function() {
    // Get the current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // Check if the scroll position is greater than or equal to 100 pixels
    if (scrollPosition >= 650) {
      // Add the data-sticky attribute to the target div
      target.setAttribute('data-stuck', 'true');
    } else {
      // If the scroll position is less than 100 pixels, remove the data-sticky attribute
      target.removeAttribute('data-stuck');
    }
  });
});

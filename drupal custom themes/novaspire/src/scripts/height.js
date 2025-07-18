const heights = document.querySelectorAll('[data-height]');

const update = () => {
  for (const target of heights) {
    const height = target.firstElementChild.getBoundingClientRect().height;
    target.style.setProperty('--height', `${height}px`);
  };
};

window.addEventListener('load', update);
window.addEventListener('resize', update);

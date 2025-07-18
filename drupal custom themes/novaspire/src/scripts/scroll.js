const root = document.documentElement;
let last = 0;

const update = () => {
  const position = root.getBoundingClientRect().top;
  if (Math.abs(last - position) > 48) {
    if (position > last) {
      root.setAttribute('data-scroll', 'up');
    } else {
      root.setAttribute('data-scroll', 'down');
    }
    last = position;
  }
}

window.addEventListener('load', update);
window.addEventListener('scroll', update);

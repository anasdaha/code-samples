import focusLock from 'dom-focus-lock';
import expand from 'data-utilities/expand';

const targets = document.querySelectorAll('[data-expand]');

for (const target of targets) {
  const type = target.getAttribute('data-expand');
  const expanded = () => target.getAttribute('aria-expanded') === 'true';

  if (!target.hasAttribute('aria-expanded')) {
    target.setAttribute('aria-expanded', false);
  }

  if (!type) {
    target.addEventListener('click', () => {
      target.setAttribute('aria-expanded', !expanded());
    });
  }

  if (type === 'group') {
    const root = target.closest('[data-expand-group]');
    const items = root.querySelectorAll('[data-expand="group"]');
    const group = [...items].filter((item) => item.closest('[data-expand-group]') === root);
    target.addEventListener('click', () => {
      for (const item of group) {
        item.setAttribute('aria-expanded', item === target);
      }
    });
  }
  if (type === 'tab') {
    expand(target);

  }
  if (type === 'popup') {
    const root = document.documentElement;
    const lock = target.hasAttribute('data-expand-lock');
    const toggle = target.getAttribute('data-expand-toggle');
    const next = target.nextElementSibling;
    target.addEventListener('click', () => {
      target.setAttribute('aria-expanded', !expanded());
      if (toggle) {
        if (expanded()) {
          root.setAttribute(`data-${toggle}`, '');
        } else {
          root.removeAttribute(`data-${toggle}`);
        }
      }
      if (lock) {
        if (expanded()) {
          focusLock.on(next.parentNode);
        } else {
          focusLock.off(next.parentNode);
        }
      }
    });
    document.addEventListener('click', (e) => {
      if (expanded() && !target.contains(e.target) && !next.contains(e.target)) {
        target.setAttribute('aria-expanded', false);
        if (toggle) {
          root.removeAttribute(`data-${toggle}`);
        }
        if (lock) {
          focusLock.off(next.parentNode);
        }
      }
    });
    document.addEventListener('keydown', (e) => {
      if (expanded() && e.key === 'Escape') {
        target.setAttribute('aria-expanded', false);
        if (toggle) {
          root.removeAttribute(`data-${toggle}`);
        }
        if (lock) {
          focusLock.off(next.parentNode);
        }
      }
    });
  }
}

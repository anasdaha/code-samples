import { CountUp } from 'countup.js';

const targets = document.querySelectorAll('[data-count]');

for (const target of targets) {
  const end = target.getAttribute('data-count');
  const start = target.getAttribute('data-count-start') || 0;
  const count = new CountUp(target, end, {
    startVal: start,
    enableScrollSpy: true,
    scrollSpyOnce: true
  });
  count.start();
}

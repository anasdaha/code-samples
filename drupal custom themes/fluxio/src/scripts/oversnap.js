import oversnap from 'oversnap';

const targets = document.querySelectorAll('[data-oversnap]');

for (const target of targets) {
  oversnap(target);
}

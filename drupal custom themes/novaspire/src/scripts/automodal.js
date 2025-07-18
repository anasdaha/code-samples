import automodal from 'automodal';

const targets = document.querySelectorAll('[data-automodal]');

for (const target of targets) {
  automodal(target);
}

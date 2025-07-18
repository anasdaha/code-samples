import expand from 'data-utilities/expand';

const triggers = document.querySelectorAll('[data-expand]');

for (const trigger of triggers) {
  expand(trigger);
}

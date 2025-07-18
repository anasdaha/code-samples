const links = document.querySelectorAll('[href*="base_safe.css"], [href*="register/embed.css"]');

for (const link of links) {
  link.remove();
}

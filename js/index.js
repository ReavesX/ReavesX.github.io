const viewTheme = document.querySelector('#theme-checkbox');

function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

viewTheme.addEventListener('change', toggleTheme);

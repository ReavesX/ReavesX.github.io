const viewTheme = document.querySelector('#theme-checkbox');

if (viewTheme) {
  console.log('Theme toggle found!');
  viewTheme.addEventListener('change', function () {
    console.log('Theme toggle clicked!');
    document.body.classList.toggle('light-mode');
    console.log('Body classes:', document.body.className);
  });
} else {
  console.error('Theme toggle NOT found!');
}

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

const downloadCheckbox = document.querySelector('#download-checkbox');
const fileName = 'Resume.pdf';
const filePath = 'Resume.pdf';

if (downloadCheckbox) {
  console.log('Download checkbox found!');

  downloadCheckbox.addEventListener('change', function () {
    if (this.checked) {
      console.log('Starting download...');

      const anchor = document.createElement('a');
      anchor.href = filePath;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  });
}

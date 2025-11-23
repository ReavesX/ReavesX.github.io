// switch theme view logic
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

// Typewriter Logic
const command = 'cat about_me.txt';
const outputText =
  "Don Jackson, I'm a Software Engineering student at Southern New Hampshire University. I enjoy tinkering with electronics and building apps.";
const typeSpeed = 50;
const typeElement = document.getElementById('typewriter-text');
let charIndex = 0;
let isTypingCommand = true;

function typeWriter() {
  if (!typeElement) return;

  if (isTypingCommand) {
    if (charIndex < command.length) {
      typeElement.innerHTML += command.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      // Command finished, wait a bit then show output
      isTypingCommand = false;
      setTimeout(() => {
        typeElement.innerHTML += '<br/><br/>'; // New line for output
        charIndex = 0; // Reset for output text
        typeWriter();
      }, 500);
    }
  } else {
    if (charIndex < outputText.length) {
      typeElement.innerHTML += outputText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    }
  }
}

// Start typing when page loads
window.addEventListener('load', typeWriter);

// donwload file logic
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

// Navigation Scroll Logic
const navMap = {
  tab1: 'home',
  tab2: 'about',
  tab3: 'skills',
  tab4: 'projects',
  tab5: 'contact',
};

const tabs = document.querySelectorAll('input[name="tab"]');

tabs.forEach((tab) => {
  tab.addEventListener('change', function () {
    if (this.checked) {
      const targetId = navMap[this.id];
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

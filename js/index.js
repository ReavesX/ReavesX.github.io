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
const command = 'cat landing_page.txt';
const outputText =
  "Don Jackson, I'm a Software Engineering student at Southern New Hampshire University. I enjoy tinkering with electronics and building apps.";
const finalCommand = './render_portfolio.sh --verbose'; // New command
const typeSpeed = 50;
const typeElement = document.getElementById('typewriter-text');
let charIndex = 0;
let stage = 'command'; // 'command', 'output', 'finalCommand'

function typeWriter() {
  if (!typeElement) return;

  if (stage === 'command') {
    if (charIndex < command.length) {
      typeElement.innerHTML += command.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      stage = 'output';
      setTimeout(() => {
        typeElement.innerHTML += '<br/><br/>';
        charIndex = 0;
        typeWriter();
      }, 500);
    }
  } else if (stage === 'output') {
    if (charIndex < outputText.length) {
      typeElement.innerHTML += outputText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      stage = 'finalCommand';
      setTimeout(() => {
        typeElement.innerHTML += '<br/><br/><span class="prompt">&gt;</span> ';
        charIndex = 0;
        typeWriter();
      }, 500);
    }
  } else if (stage === 'finalCommand') {
    if (charIndex < finalCommand.length) {
      typeElement.innerHTML += finalCommand.charAt(charIndex);
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

// Project Inventory Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Update Active Button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Filter Logic
    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categoryRaw = card.getAttribute('data-category') || '';
      const categories = categoryRaw.split(' ');

      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'flex';
        // Add a small fade-in animation
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/**
 * Navigation Logic
 * Handles tab switching, smooth scrolling, and scroll-spy functionality.
 */
export function initNavigation() {
    const navMap = {
        tab1: 'home',
        tab2: 'about',
        tab3: 'section-skills',
        tab4: 'projects',
        tab5: 'contact',
    };

    const tabs = document.querySelectorAll('input[name="tab"]');

    // Click Listener: Scroll to section when tab is clicked
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

    // Scroll Spy & Nav Hider
    const header = document.querySelector('.site-header');

    const sectionObserverOptions = {
        threshold: 0.5, // Trigger when 50% of section is visible (Safer for detecting 'active')
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const activeSectionId = entry.target.id;

                // 1. Hide/Show Nav based on Home
                if (activeSectionId === 'home') {
                    header.classList.add('nav-hidden');
                } else {
                    header.classList.remove('nav-hidden');
                    header.style.transform = ''; // Clear inline style that prevents showing
                }

                // 2. Active Tab Logic
                for (const [tabId, sectionId] of Object.entries(navMap)) {
                    if (sectionId === activeSectionId) {
                        const tabToSelect = document.getElementById(tabId);
                        if (tabToSelect && !tabToSelect.checked && activeSectionId !== 'home') {
                            tabToSelect.checked = true;
                        }
                        break;
                    }
                }
            }
        });
    }, sectionObserverOptions);

    // Observe all sections defined in navMap
    Object.values(navMap).forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            sectionObserver.observe(section);
        }
    });
}

/**
 * Download Logic
 * Handles the specialized download button behavior.
 */
export function initDownloads() {
    // Select all download inputs (using class 'download-trigger' which we will add, or generic input selector within that structure)
    // To be safe, we'll select by the container class pattern or add a specific class in HTML. 
    // Let's assume we will add 'download-trigger' class to the inputs in HTML.

    // Fallback: Select by .Download .input if specific class isn't there yet, but better to use specific class
    const downloadCheckboxes = document.querySelectorAll('.Download .input');
    const fileName = 'Resume.pdf';
    const filePath = 'Resume.pdf';

    if (downloadCheckboxes.length > 0) {
        downloadCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    // console.log('Starting download...');
                    const anchor = document.createElement('a');
                    anchor.href = filePath;
                    anchor.download = fileName;
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);

                    // Uncheck ALL download checkboxes after delay
                    setTimeout(() => {
                        downloadCheckboxes.forEach(cb => cb.checked = false);
                    }, 2000);
                }
            });
        });
    }
}

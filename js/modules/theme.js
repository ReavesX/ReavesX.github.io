/**
 * Theme Toggle Logic
 * Handles switching between dark and light modes.
 */
export function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-checkbox');
    const body = document.body;

    if (themeToggles.length > 0) {
        themeToggles.forEach(toggle => {
            toggle.addEventListener('change', function () {
                const isChecked = this.checked;

                // Toggle theme on body
                if (isChecked) {
                    body.classList.add('light-mode');
                } else {
                    body.classList.remove('light-mode');
                }

                // Sync all other toggles
                themeToggles.forEach(t => {
                    if (t !== this) {
                        t.checked = isChecked;
                    }
                });
            });
        });
    } else {
        console.warn('Theme toggle NOT found!');
    }
}

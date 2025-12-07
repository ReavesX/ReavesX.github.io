/**
 * Projects Logic
 * Handles the category filtering for the project grid.
 */
export function initProjects() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

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
}

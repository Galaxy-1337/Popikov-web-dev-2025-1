document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dishGrids = document.querySelectorAll('.dishes-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-kind');
            const isActive = this.classList.contains('active');
            const filtersContainer = this.parentElement;
            const buttons = filtersContainer.querySelectorAll('.filter-btn');

            buttons.forEach(btn => btn.classList.remove('active'));

            if (isActive && filterValue !== 'all') {
                buttons[0].classList.add('active'); // "Все"
                applyFilter('all', filtersContainer);
            } else {
                this.classList.add('active');
                applyFilter(filterValue, filtersContainer);
            }
        });
    });

    function applyFilter(kind, filtersContainer) {
        const dishesGrid = filtersContainer.nextElementSibling;
        const cards = dishesGrid.querySelectorAll('.dish-card');

        cards.forEach(card => {
            if (kind === 'all') {
                card.style.display = 'flex';
            } else {
                const cardKind = card.dataset.kind;
                card.style.display = cardKind === kind ? 'flex' : 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const sections = {
        soup: document.getElementById('soup'),
        main: document.getElementById('main'),
        salat: document.getElementById('salat'),
        drink: document.getElementById('drink'),
        dessert: document.getElementById('dessert')
    };

    const categoryNames = {
        soup: 'Суп',
        main: 'Основное',
        salat: 'Салат или стартер',
        drink: 'Напиток',
        dessert: 'Десерт'
    };

    //блюда по категориям
    const dishesByCategory = {};
    const filtersByCategory = {};

    dishes.forEach(dish => {
        const cat = dish.category;
        if (!dishesByCategory[cat]) {
            dishesByCategory[cat] = [];
            filtersByCategory[cat] = new Set();
        }
        dishesByCategory[cat].push(dish);
        filtersByCategory[cat].add(dish.kind);
    });

    // создание карточки блюда
    function createDishCard(dish) {
        const card = document.createElement('div');
        card.classList.add('dish-card');
        card.dataset.keyword = dish.keyword;
        card.dataset.kind = dish.kind;

        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <h3 class="dish-title">${dish.name}</h3>
            <p class="dish-weight">${dish.count}</p>
            <p class="dish-price">${dish.price} ₽</p>
            <button class="add-btn">Добавить</button>
        `;

        return card;
    }

    Object.keys(sections).forEach(category => {
        const section = sections[category];
        const dishesList = dishesByCategory[category] || [];
        const filterKinds = filtersByCategory[category] || new Set();

        const dishesGrid = section.querySelector('.dishes-grid');

        // блок фильтров
        const filtersContainer = document.createElement('div');
        filtersContainer.classList.add('filters');
        filtersContainer.innerHTML = `
            <button class="filter-btn active" data-kind="all">Все</button>
        `;
        filterKinds.forEach(kind => {
            const btn = document.createElement('button');
            btn.classList.add('filter-btn');
            btn.setAttribute('data-kind', kind);
            btn.textContent = getKindLabel(kind);
            filtersContainer.appendChild(btn);
        });

        // фильтры перед сеткой
        section.insertBefore(filtersContainer, dishesGrid);

        // Отображает карточки
        dishesList.forEach(dish => {
            const card = createDishCard(dish);
            dishesGrid.appendChild(card);
        });
    });

    function getKindLabel(kind) {
        const labels = {
            meat: 'Мясной',
            fish: 'Рыбный',
            veg: 'Вегетарианский',
            hot: 'Горячий',
            cold: 'Холодный',
            small: 'Маленький',
            mid: 'Средний',
            big: 'Большой'
        };
        return labels[kind] || kind;
    }
});
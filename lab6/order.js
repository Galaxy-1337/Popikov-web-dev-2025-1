let cart = {};


window.cart = cart;


function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const costBlock = orderSummary?.querySelector('.cost-total');

    if (!orderSummary || !costBlock) return;
    while (orderSummary.firstChild !== costBlock) {
        orderSummary.removeChild(orderSummary.firstChild);
    }

    let total = 0;

    if (Object.keys(cart).length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'no-selection';
        emptyMsg.textContent = 'Пока ничего не выбрано';
        orderSummary.insertBefore(emptyMsg, costBlock);
    } else {
        Object.values(cart).forEach(item => {
            total += item.price * item.count;

            const itemEl = document.createElement('div');
            itemEl.className = 'order-item';
            itemEl.innerHTML = `
                <div class="selected-dish">
                    <span class="dish-name">${item.name} × ${item.count}</span>
                    <span class="dish-price">${item.price * item.count} ₽</span>
                </div>
            `;
            orderSummary.insertBefore(itemEl, costBlock);
        });
    }

    const costValue = orderSummary.querySelector('.cost-value');
    if (costValue) {
        costValue.textContent = `${total} ₽`;
    }
}

// Делаем доступным глобально
window.updateOrderSummary = updateOrderSummary;

/**
 * Отрисовка всех блюд по категориям
 */
function renderDishes() {
    const categories = {
        soup: { selector: '#soup', title: 'Выберите суп' },
        main: { selector: '#main', title: 'Выберите блюдо' },
        salat: { selector: '#salat', title: 'Выберите салат или стартер' },
        drink: { selector: '#drink', title: 'Выберите напиток' },
        dessert: { selector: '#dessert', title: 'Выберите десерт' }
    };

    Object.keys(categories).forEach(categoryKey => {
        const config = categories[categoryKey];
        const section = document.querySelector(config.selector);

        if (!section) {
            console.warn(`Секция ${config.selector} не найдена`);
            return;
        }

        // Обновляем заголовок
        const heading = section.querySelector('h2');
        if (heading && config.title) {
            heading.textContent = config.title;
        }

        const grid = section.querySelector('.dishes-grid');
        if (!grid) {
            console.error(`Grid не найден в секции ${config.selector}`);
            return;
        }

        grid.innerHTML = ''; // очищаем

        const dishesInCategory = dishes.filter(dish => dish.category === categoryKey);

        if (dishesInCategory.length === 0) {
            console.warn(`Нет блюд в категории: ${categoryKey}`);
            return;
        }

        dishesInCategory.forEach(dish => {
            const dishCard = document.createElement('div');
            dishCard.className = 'dish-card';
            dishCard.dataset.keyword = dish.keyword;

            dishCard.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                <div class="dish-info">
                    <h3 class="dish-title">${dish.name}</h3>
                    <p class="dish-count">${dish.count}</p>
                    <div class="dish-footer">
                        <span class="dish-price">${dish.price} ₽</span>
                        <button class="add-btn">Добавить</button>
                    </div>
                </div>
            `;

            grid.appendChild(dishCard);
        });
    });
}


document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('add-btn')) return;

    const card = e.target.closest('.dish-card');
    if (!card) return;

    const keyword = card.dataset.keyword;
    const dish = dishes.find(d => d.keyword === keyword);

    if (!dish) {
        showNotification('Блюдо не найдено');
        return;
    }

    // десерты можно добавлять всегда ===
    if (dish.category === 'dessert') {
        if (window.cart[keyword]) {
            window.cart[keyword].count += 1;
        } else {
            window.cart[keyword] = {
                name: dish.name,
                price: dish.price,
                count: 1
            };
        }
        updateOrderSummary();
        card.style.borderColor = '#993f3f';
        card.style.backgroundColor = '#fff5f5';
        return; // выходим — проверка комбо не нужна
    }

    // === Для всех остальных блюд: комбо обязательно ===
    const selectedCombo = window.getSelectedCombination?.();
    if (!selectedCombo) {
        showNotification('Сначала выберите комбо из предложенных!');
        return;
    }

    // Проверяем соответствие категории комбо
    const categoryForCombo = dish.category === 'drink' ? 'drink' : dish.category;
    if (!selectedCombo.categories.includes(categoryForCombo)) {
        showNotification(`Это блюдо не входит в ${selectedCombo.name}`);
        return;
    }

    // Добавляем в корзину
    if (window.cart[keyword]) {
        window.cart[keyword].count += 1;
    } else {
        window.cart[keyword] = {
            name: dish.name,
            price: dish.price,
            count: 1
        };
    }

    updateOrderSummary();
    card.style.borderColor = '#993f3f';
    card.style.backgroundColor = '#fff5f5';
});

/**
 * Инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('order.js: DOM загружен');

    if (typeof dishes === 'undefined') {
        console.error('Ошибка: массив dishes не найден. Проверьте menu.js');
        showNotification?.('Ошибка загрузки данных меню');
        return;
    }

    // Инициализация блока "Итого"
    const orderSummary = document.getElementById('order-summary');
    if (orderSummary && !orderSummary.querySelector('.cost-total')) {
        const costValue = document.createElement('p');
        costValue.className = 'cost-value';
        costValue.textContent = '0 ₽';

        const costBlock = document.createElement('div');
        costBlock.className = 'cost-total';
        costBlock.innerHTML = '<span class="cost-label">Итого:</span> ';
        costBlock.appendChild(costValue);

        orderSummary.appendChild(costBlock);
    }

    // Очистка формы
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('reset', function () {
            setTimeout(() => {
                window.cart = {};
                updateOrderSummary();
                document.querySelectorAll('.dish-card').forEach(card => {
                    card.style.borderColor = 'transparent';
                    card.style.backgroundColor = '';
                });
            }, 10);
        });
    }

    // Отрисовка блюд и обновление корзины
    renderDishes();
    updateOrderSummary();
});

/**
 * Расчёт общей суммы
 */
function getTotalPrice() {
    return Object.values(window.cart).reduce((sum, item) => sum + item.price * item.count, 0);
}

// Экспортируем
window.getTotalPrice = getTotalPrice;

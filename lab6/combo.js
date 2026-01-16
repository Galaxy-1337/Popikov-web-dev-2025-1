document.addEventListener('DOMContentLoaded', function () {
    createLunchCombinations();
    initializeNotificationSystem();
});

let selectedCombination = null;

function createLunchCombinations() {
    const combosContainer = document.createElement('section');
    combosContainer.id = 'lunch-combinations';
    combosContainer.className = 'container';

    // Сначала задаём содержимое
    combosContainer.innerHTML = `
        <h2>Доступные для заказа комбо</h2>
        <div class="combos-grid"></div>
    `;

    // Теперь ищем .combos-grid — он уже существует в памяти
    const combosGrid = combosContainer.querySelector('.combos-grid');

    const categoryIcons = {
        'soup': 'images/icons/soup.png',
        'main': 'images/icons/main.png',
        'salat': 'images/icons/salat.png',
        'drink': 'images/icons/drink.png',
        'dessert': 'images/icons/dessert.png'
    };

    const categoryNames = {
        'soup': 'Суп',
        'main': 'Главное блюдо',
        'salat': 'Салат',
        'drink': 'Напиток',
        'dessert': 'Десерт'
    };

    // Берём комбо из menu.js
    const combos = window.lunchCombinations;

    if (!combos || !Array.isArray(combos)) {
        console.error('window.lunchCombinations не найден или не массив');
        return;
    }

    combos.forEach(combo => {
        const comboCard = document.createElement('div');
        comboCard.className = 'combo-card';
        comboCard.dataset.comboId = combo.id;

        let categoriesHTML = '';
        combo.categories.forEach(cat => {
            categoriesHTML += `
                <div class="combo-category-item">
                    <img src="${categoryIcons[cat]}" alt="${cat}" class="combo-category-icon-img">
                    <span class="combo-category-name">${categoryNames[cat]}</span>
                </div>
            `;
        });

        comboCard.innerHTML = `
            <h3>${combo.name}</h3>
            <div class="combo-categories">
                ${categoriesHTML}
            </div>
        `;

        comboCard.addEventListener('click', () => {
            document.querySelectorAll('.combo-card').forEach(card => {
                card.style.borderColor = 'transparent';
            });
            comboCard.style.borderColor = '#993f3f';
            selectedCombination = combo;
            highlightValidCategories(combo.categories);
            showNotification(`Выбрано: ${combo.name}. Добавьте соответствующие блюда.`);
        });

        combosGrid.appendChild(comboCard);
    });

    // Блок с десертом
    const dessertInfo = document.createElement('div');
    dessertInfo.className = 'dessert-info';
    dessertInfo.innerHTML = `
        <div class="dessert-content">
            <div class="combo-category-item dessert-item">
                <img src="${categoryIcons['dessert']}" alt="dessert" class="combo-category-icon-img">
                <span class="combo-category-name">Десерт</span>
            </div>
            <p class="dessert-note">Можно добавить в любой заказ</p>
        </div>
    `;
    combosGrid.appendChild(dessertInfo);

    const container = document.querySelector('main .container');
    const soupSection = document.querySelector('#soup');

    if (container && soupSection) {
        container.insertBefore(combosContainer, soupSection);
    } else if (container) {
        container.appendChild(combosContainer);
    } else {
        document.querySelector('main')?.prepend(combosContainer);
    }
}

function highlightValidCategories(allowedCategories) {
    document.querySelectorAll('.dish-card').forEach(card => {
        const keyword = card.dataset.keyword;
        const dish = window.dishes?.find(d => d.keyword === keyword);
        if (!dish) return;

        const category = dish.category === 'drink' ? 'drink' : dish.category;
        if (allowedCategories.includes(category)) {
            card.style.borderColor = '#ccc';
        } else {
            card.style.borderColor = 'transparent';
        }
    });
}

window.getSelectedCombination = () => selectedCombination;

function initializeNotificationSystem() {
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p class="notification-message" id="notification-message"></p>
            <button class="notification-ok-btn" id="notification-ok-btn">Окей</button>
        </div>
    `;
    document.body.appendChild(notification);
    document.getElementById('notification-ok-btn').addEventListener('click', hideNotification);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notification-message');
    messageEl.textContent = message;
    notification.style.display = 'flex';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}

window.showNotification = showNotification;
window.hideNotification = hideNotification;
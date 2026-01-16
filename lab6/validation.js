document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('order-form');

    if (!orderForm) {
        console.error('Форма #order-form не найдена');
        return;
    }

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Проверка: выбрано ли комбо?
        const selectedCombo = window.getSelectedCombination?.();
        if (!selectedCombo) {
            showNotification('Пожалуйста, выберите одно из комбо');
            return;
        }

        // Проверка заказа
        const orderValidation = validateOrder(selectedCombo);
        if (!orderValidation.isValid) {
            showNotification(orderValidation.message);
            return;
        }

        // Проверка персональных данных
        const personalDataValidation = validatePersonalData();
        if (!personalDataValidation.isValid) {
            showNotification(personalDataValidation.message);
            return;
        }

        // Если всё ок — отправляем
        processOrderSubmission(selectedCombo);
    });
});

/**
 * Проверка состава заказа
 */
function validateOrder(combo) {
    const selectedDishes = getSelectedDishes();
    if (selectedDishes.length === 0) {
        return {
            isValid: false,
            message: 'Ничего не выбрано. Выберите блюда для заказа.'
        };
    }

    // Разделяем блюда на основные и десерты
    const mainDishes = selectedDishes.filter(dish => dish.category !== 'dessert');
    const desserts = selectedDishes.filter(dish => dish.category === 'dessert');

    // Категории из основных блюд
    const selectedCategories = [...new Set(mainDishes.map(dish => {
        return dish.category === 'drink' ? 'drink' : dish.category;
    }))];

    const requiredCategories = combo.categories;

    // Проверяем, что все нужные категории выбраны
    const missing = requiredCategories.filter(cat => !selectedCategories.includes(cat));
    if (missing.length > 0) {
        const names = { soup: 'суп', main: 'главное блюдо', salat: 'салат', drink: 'напиток' };
        return {
            isValid: false,
            message: `Не хватает: ${missing.map(m => names[m]).join(', ')}`
        };
    }

    // Проверяем, что нет лишних категорий (кроме десертов)
    const extra = selectedCategories.filter(cat => !requiredCategories.includes(cat));
    if (extra.length > 0) {
        return {
            isValid: false,
            message: 'В заказе есть блюда, не входящие в выбранное комбо.'
        };
    }

    return {
        isValid: true,
        combination: combo
    };
}

/**
 * Проверка персональных данных
 */
function validatePersonalData() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const deliveryTime = document.querySelector('input[name="delivery_time"]:checked');

    if (!name) {
        return { isValid: false, message: 'Введите имя' };
    }
    if (!email) {
        return { isValid: false, message: 'Введите email' };
    }
    if (!isValidEmail(email)) {
        return { isValid: false, message: 'Введите корректный email' };
    }
    if (!phone) {
        return { isValid: false, message: 'Введите номер телефона' };
    }
    if (!address) {
        return { isValid: false, message: 'Введите адрес доставки' };
    }
    if (!deliveryTime) {
        return { isValid: false, message: 'Выберите время доставки' };
    }
    if (deliveryTime.value === 'scheduled') {
        const timeInput = document.getElementById('delivery-time-input')?.value;
        if (!timeInput) {
            return { isValid: false, message: 'Укажите время доставки' };
        }
    }

    return { isValid: true };
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Получение выбранных блюд из корзины
 */
function getSelectedDishes() {
    const result = [];
    if (!window.cart) return result;

    Object.keys(window.cart).forEach(keyword => {
        const dish = window.dishes?.find(d => d.keyword === keyword);
        if (dish) {
            for (let i = 0; i < window.cart[keyword].count; i++) {
                result.push(dish);
            }
        }
    });
    return result;
}

/**
 * Обработка успешной отправки
 */
function processOrderSubmission(combo) {
    const formData = new FormData(document.getElementById('order-form'));
    const data = Object.fromEntries(formData.entries());

    data.order = { ...window.cart };
    data.total = window.getTotalPrice();
    data.combination = combo.name;

    console.log('✅ Заказ отправлен:', data);
    showNotification(`Заказ успешно отправлён! Выбрано: ${combo.name}`);

    // Очистка через 2 секунды
    setTimeout(() => {
        document.getElementById('order-form').reset();
        window.cart = {};
        window.updateOrderSummary();

        // Снимаем выделение с блюд
        document.querySelectorAll('.dish-card').forEach(card => {
            card.style.borderColor = 'transparent';
            card.style.backgroundColor = '';
        });

        hideNotification();
    }, 2000);
}



















// Глобальные функции (на случай, если combo.js их не предоставил)
window.validateOrder = validateOrder;
window.validatePersonalData = validatePersonalData;
window.processOrderSubmission = processOrderSubmission;

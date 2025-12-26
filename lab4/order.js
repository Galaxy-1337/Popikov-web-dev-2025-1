// Объект для хранения текущего заказа
let currentOrder = {
    soup: null,
    main: null,
    drink: null
};

let totalPrice = 0;

// Функция добавления блюда в заказ
function addToOrder(dish) {
    const categoryElements = document.querySelectorAll(`[data-id].selected`);
    categoryElements.forEach(el => {
        if (getCategoryFromId(el.getAttribute('data-id')) === dish.category) {
            el.classList.remove('selected');
        }
    });
    
    // Добавляем новое блюдо в заказ
    switch(dish.category) {
        case 'soup':
            currentOrder.soup = dish;
            break;
        case 'main':
            currentOrder.main = dish;
            break;
        case 'drink':
            currentOrder.drink = dish;
            break;
    }
    
    updateOrderDisplay();
    calculateTotal();
}

// Функция выделения выбранного блюда
function highlightSelectedDish(category, dishId) {
    const allDishes = document.querySelectorAll('.dish-item');
    allDishes.forEach(dish => {
        if (getCategoryFromId(dish.getAttribute('data-id')) === category) {
            dish.classList.remove('selected');
        }
    });
    
    const selectedDish = document.querySelector(`[data-id="${dishId}"]`);
    if (selectedDish) {
        selectedDish.classList.add('selected');
    }
}

// Функция определения категории по ID блюда
function getCategoryFromId(dishId) {
    const dish = dishes.find(d => d.keyword === dishId);
    return dish ? dish.category : null;
}

//Функция обновления отображения заказа
function updateOrderDisplay() {
    const orderSummary = document.getElementById('order-summary');
    
    let html = '<h3>Ваш заказ</h3>';
    
    if (!currentOrder.soup && !currentOrder.main && !currentOrder.drink) {
        html += '<p class="nothing-selected">Ничего не выбрано</p>';
        orderSummary.innerHTML = html;
        return;
    }
    
    if (currentOrder.soup) {
        html += `<div class="order-category">
                    <strong>Суп</strong>
                    <p>${currentOrder.soup.name} ${currentOrder.soup.price}₽</p>
                </div>`;
    } else {
        html += `<div class="order-category">
                    <strong>Суп</strong>
                    <p>Блюдо не выбрано</p>
                </div>`;
    }
    
    if (currentOrder.main) {
        html += `<div class="order-category">
                    <strong>Главное блюдо</strong>
                    <p>${currentOrder.main.name} ${currentOrder.main.price}₽</p>
                </div>`;
    } else {
        html += `<div class="order-category">
                    <strong>Главное блюдо</strong>
                    <p>Блюдо не выбрано</p>
                </div>`;
    }
    
    if (currentOrder.drink) {
        html += `<div class="order-category">
                    <strong>Напиток</strong>
                    <p>${currentOrder.drink.name} ${currentOrder.drink.price}₽</p>
                </div>`;
    } else {
        html += `<div class="order-category">
                    <strong>Напиток</strong>
                    <p>Напиток не выбран</p>
                </div>`;
    }
    
    orderSummary.innerHTML = html;
}

// Функция расчета общей стоимости
function calculateTotal() {
    totalPrice = 0;
    
    if (currentOrder.soup) totalPrice += currentOrder.soup.price;
    if (currentOrder.main) totalPrice += currentOrder.main.price;
    if (currentOrder.drink) totalPrice += currentOrder.drink.price;
    
    updateTotalDisplay();
}

// Функция обновления отображения суммы
function updateTotalDisplay() {
    const totalElement = document.getElementById('total-price');
    const totalContainer = document.getElementById('total-container');
    
    if (totalPrice > 0) {
        totalElement.textContent = `${totalPrice}₽`;
        totalContainer.style.display = 'block';
    } else {
        totalContainer.style.display = 'none';
    }
}

// Код, который выполняется при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayDishes();
    updateOrderDisplay();
    
    const orderColumn = document.querySelector('.order-column');
    const totalContainer = document.createElement('div');
    totalContainer.id = 'total-container';
    totalContainer.className = 'total-container';
    totalContainer.style.display = 'none';
    totalContainer.innerHTML = `
        <div class="order-category">
            <strong>Стоимость заказа</strong>
            <p id="total-price">0₽</p>
        </div>
    `;
    orderColumn.appendChild(totalContainer);
});
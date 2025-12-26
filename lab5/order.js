document.addEventListener('DOMContentLoaded', function () {
    const orderSummary = document.getElementById('order-summary');
    const orderForm = document.getElementById('order-form');
    const costValue = document.createElement('p');
    costValue.classList.add('cost-value');
    costValue.textContent = '0 ₽';

    const costBlock = document.createElement('div');
    costBlock.classList.add('cost-total');
    costBlock.innerHTML = '<span class="cost-label">Итого:</span>';
    costBlock.appendChild(costValue);

    orderSummary.appendChild(costBlock);

    let cart = {};

    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('add-btn')) return;

        const card = e.target.closest('.dish-card');
        const keyword = card.dataset.keyword;
        const name = card.querySelector('.dish-title').textContent;
        const price = parseInt(card.querySelector('.dish-price').textContent);

        if (cart[keyword]) {
            cart[keyword].count += 1;
        } else {
            cart[keyword] = { name, price, count: 1 };
        }

        updateOrderSummary();
    });

    function updateOrderSummary() {
        while (orderSummary.firstChild !== costBlock) {
            orderSummary.removeChild(orderSummary.firstChild);
        }

        let total = 0;

        if (Object.keys(cart).length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.classList.add('no-selection');
            emptyMsg.textContent = 'Пока ничего не выбрано';
            orderSummary.insertBefore(emptyMsg, costBlock);
        } else {
            Object.values(cart).forEach(item => {
                total += item.price * item.count;

                const itemEl = document.createElement('div');
                itemEl.classList.add('order-item');
                itemEl.innerHTML = `
                    <div class="selected-dish">
                        <span class="dish-name">${item.name} × ${item.count}</span>
                        <span class="dish-price">${item.price * item.count} ₽</span>
                    </div>
                `;
                orderSummary.insertBefore(itemEl, costBlock);
            });
        }

        costValue.textContent = `${total} ₽`;
    }

    // Отправка формы
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());

        data.order = cart;
        data.total = getTotalPrice();

        console.log('Данные заказа:', data);
        alert('Заказ успешно отправлен! (имитация)');

        // Очистка
        orderForm.reset();
        cart = {};
        updateOrderSummary();
    });

    function getTotalPrice() {
        return Object.values(cart).reduce((sum, item) => sum + item.price * item.count, 0);
    }

    updateOrderSummary();
});

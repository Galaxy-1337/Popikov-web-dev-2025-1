//  Основной блок кода для показа блюд
function displayDishes() {
    const sorted = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    
    //  Фильтруем блюда по категориям
    const soups = sorted.filter(dish => dish.category === 'soup');
    const mains = sorted.filter(dish => dish.category === 'main');
    const drinks = sorted.filter(dish => dish.category === 'drink');
    
    // Находим секцию для супов и очищаем её содержимое
    const soupSection = document.getElementById('soup');
    const soupGrid = soupSection.querySelector('div');
    soupGrid.innerHTML = '';
    
    // Для каждого супа создаем HTML-элемент и добавляем в сетку
    soups.forEach(soup => {
        const dishElement = createDishElement(soup);
        soupGrid.appendChild(dishElement);
    });
    
    const mainSection = document.getElementById('main');
    const mainGrid = mainSection.querySelector('div');
    mainGrid.innerHTML = '';
    
    mains.forEach(main => {
        const dishElement = createDishElement(main);
        mainGrid.appendChild(dishElement);
    });
    
    const drinkSection = document.getElementById('drinks');
    const drinkGrid = drinkSection.querySelector('div');
    drinkGrid.innerHTML = '';
    
    drinks.forEach(drink => {
        const dishElement = createDishElement(drink);
        drinkGrid.appendChild(dishElement);
    });
}

// Функция создания HTML-элемента для одного блюда
function createDishElement(dish) {
    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish-item';
    dishDiv.setAttribute('data-id', dish.keyword);
    
    // Вставляем HTML содержимое карточки
    dishDiv.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
        <p class="price">${dish.price} ₽</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;
    
     // Находим кнопку "Добавить" внутри созданного элемента
    const addButton = dishDiv.querySelector('.add-btn');
    
     // Добавляем обработчик события клика на кнопку
    addButton.addEventListener('click', function() {
        addToOrder(dish);
        highlightSelectedDish(dish.category, dish.keyword);
    });
    
    return dishDiv;
}
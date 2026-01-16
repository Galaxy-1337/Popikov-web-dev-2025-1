const dishes = [
    {
        keyword: 'mushroom_soup',
        name: 'Грибной крем-суп',
        price: 170,
        category: 'soup',
        count: '300 грамм',
        image: 'images/soups/mushroom_soup.jpg',
        kind: 'veg'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежская суп',
        price: 320,
        category: 'soup',
        count: '250 грамм',
        image: 'images/soups/norwegian_soup.jpg',
        kind: 'fish'
    },
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 160,
        category: 'soup',
        count: '300 грамм',
        image: 'images/soups/gazpacho.jpg',
        kind: 'veg'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 240,
        category: 'soup',
        count: '280 грамм',
        image: 'images/soups/chicken.jpg',
        kind: 'meat'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 320,
        category: 'soup',
        count: '400 грамм',
        image: 'images/soups/ramen.jpg',
        kind: 'meat'
    },
    {
        keyword: 'tomyum',
        name: 'Том Ям',
        price: 360,
        category: 'soup',
        count: '350 грамм',
        image: 'images/soups/tomyum.jpg',
        kind: 'fish'
    },

    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 280,
        category: 'main',
        count: '350 грамм',
        image: 'images/main_course/lasagna.jpg',
        kind: 'meat'
    },
    {
        keyword: 'chicken_cutlets',
        name: 'Куриные котлеты с пюре',
        price: 190,
        category: 'main',
        count: '200 грамм',
        image: 'images/main_course/chickencutletsandmashedpotatoes.jpg',
        kind: 'meat'
    },
    {
        keyword: 'fried_potatoes_mushrooms',
        name: 'Картошка с грибами',
        price: 210,
        category: 'main',
        count: '300 грамм',
        image: 'images/main_course/friedpotatoeswithmushrooms1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'fish_rice',
        name: 'Рыба с рисом',
        price: 340,
        category: 'main',
        count: '350 грамм',
        image: 'images/main_course/fishrice.jpg',
        kind: 'fish'
    },
    {
        keyword: 'pizza',
        name: 'Пицца',
        price: 420,
        category: 'main',
        count: '400 грамм',
        image: 'images/main_course/pizza.jpg',
        kind: 'meat'
    },
    {
        keyword: 'shrimp_pasta',
        name: 'Паста с креветками',
        price: 380,
        category: 'main',
        count: '320 грамм',
        image: 'images/main_course/shrimppasta.jpg',
        kind: 'fish'
    },

    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 70,
        category: 'drink',
        count: '200 мл',
        image: 'images/beverages/orangejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 60,
        category: 'drink',
        count: '200 мл',
        image: 'images/beverages/applejuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 40,
        category: 'drink',
        count: '200 мл',
        image: 'images/beverages/carrotjuice.jpg',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '250 мл',
        image: 'images/beverages/cappuccino.jpg',
        kind: 'hot'
    },
    {
        keyword: 'green_tea',
        name: 'Зеленый чай',
        price: 90,
        category: 'drink',
        count: '250 мл',
        image: 'images/beverages/greentea.jpg',
        kind: 'hot'
    },
    {
        keyword: 'black_tea',
        name: 'Чай черный',
        price: 80,
        category: 'drink',
        count: '250 мл',
        image: 'images/beverages/tea.jpg',
        kind: 'hot'
    },

    {
        keyword: 'baklava',
        name: 'Баклава',
        price: 220,
        category: 'dessert',
        count: '150 грамм',
        image: 'images/desserts/baklava.jpg',
        kind: 'mid'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 280,
        category: 'dessert',
        count: '200 грамм',
        image: 'images/desserts/checheesecake.jpg',
        kind: 'small'
    },
    {
        keyword: 'donuts',
        name: 'Пончики',
        price: 120,
        category: 'dessert',
        count: '3 шт',
        image: 'images/desserts/donuts.jpg',
        kind: 'big'
    },
    {
        keyword: 'glazed_donuts',
        name: 'Пончики глазированные',
        price: 150,
        category: 'dessert',
        count: '3 шт',
        image: 'images/desserts/donuts2.jpg',
        kind: 'mid'
    },
    {
        keyword: 'chocolate_cake',
        name: 'Шоколадный торт',
        price: 320,
        category: 'dessert',
        count: '250 грамм',
        image: 'images/desserts/chocolatecake.jpg',
        kind: 'small'
    },
    {
        keyword: 'chocolate_cheesecake',
        name: 'Шоколадный чизкейк',
        price: 350,
        category: 'dessert',
        count: '220 грамм',
        image: 'images/desserts/chocolatecheesecake.jpg',
        kind: 'small'
    },

    {
        keyword: 'caesar_salad',
        name: 'Салат Цезарь',
        price: 280,
        category: 'salat',
        count: '250 грамм',
        image: 'images/salads_starters/caesar.jpg',
        kind: 'meat'
    },
    {
        keyword: 'caprese_salad',
        name: 'Салат Капрезе',
        price: 240,
        category: 'salat',
        count: '200 грамм',
        image: 'images/salads_starters/caprese.jpg',
        kind: 'veg'
    },
    {
        keyword: 'french_fries',
        name: 'Картофель фри',
        price: 160,
        category: 'salat',
        count: '200 грамм',
        image: 'images/salads_starters/frenchfries1.jpg',
        kind: 'veg'
    },
    {
        keyword: 'french_fries_sauce',
        name: 'Картофель фри с соусом',
        price: 190,
        category: 'salat',
        count: '220 грамм',
        image: 'images/salads_starters/frenchfries2.jpg',
        kind: 'veg'
    },
    {
        keyword: 'egg_salad',
        name: 'Салат с яйцом',
        price: 210,
        category: 'salat',
        count: '230 грамм',
        image: 'images/salads_starters/saladwithegg.jpg',
        kind: 'veg'
    },
    {
        keyword: 'tuna_salad',
        name: 'Салат с тунцом',
        price: 320,
        category: 'salat',
        count: '250 грамм',
        image: 'images/salads_starters/tunasalad.jpg',
        kind: 'fish'
    }
];

const lunchCombinations = [
    {
        id: 1,
        name: "Комбо 1",
        categories: ['soup', 'main', 'salat', 'drink'],  // ← исправлено: было requiredCategories
        description: "Полный обед"
    },
    {
        id: 2,
        name: "Комбо 2",
        categories: ['soup', 'main', 'drink'],  // ←
        description: "Суповой сет"
    },
    {
        id: 3,
        name: "Комбо 3",
        categories: ['soup', 'salat', 'drink'],  // ←
        description: "Легкий ланч"
    },
    {
        id: 4,
        name: "Комбо 4",
        categories: ['main', 'salat', 'drink'],  // ←
        description: "Основное + салат"
    },
    {
        id: 5,
        name: "Комбо 5",
        categories: ['main', 'drink'],  // ←
        description: "Быстрый перекус"
    }
];

window.dishes = dishes;
window.lunchCombinations = lunchCombinations;
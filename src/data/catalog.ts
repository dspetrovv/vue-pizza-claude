import type {
  FilterGroup,
  DoughOption,
  SizeOption,
  PizzaProduct,
  CatalogProduct,
  CatalogProductSmall,
} from '@/types/catalog'

export const filterGroups: FilterGroup[] = [
  { title: 'Общее', items: ['Хит', 'Новинка', 'Острая', 'Вегетарианская'] },
  { title: 'Сыр', items: ['Моцарелла', 'Чеддер', 'Пармезан', 'Дор Блю', 'Брынза'] },
  { title: 'Мясо', items: ['Пепперони', 'Ветчина', 'Бекон', 'Курица', 'Колбаски'] },
  { title: 'Компонент', items: ['Грибы', 'Томаты', 'Перец', 'Лук', 'Оливки', 'Ананас'] },
]

export const pizzaDoughOptions: DoughOption[] = [
  { label: 'Традиционное', value: 'traditional' },
  { label: 'Тонкое', value: 'thin' },
]

export const pizzaSizeOptions: SizeOption[] = [
  { label: '20 см', value: '20' },
  { label: '28 см', value: '28' },
  { label: '33 см', value: '33' },
]

export const pizzas: PizzaProduct[] = [
  {
    name: 'Пепперони по-деревенски',
    description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
    price: 399,
    tag: 'New',
    emoji: '🍕',
    weight: '400 г',
    ingredients: [
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'pepperoni', name: 'Пепперони', emoji: '🍖' },
      { id: 'tomatoes', name: 'Томаты', emoji: '🍅' },
      { id: 'tomato-sauce', name: 'Томатный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'mushrooms', name: 'Шампиньоны', price: 59, emoji: '🍄' },
      { id: 'red-onion', name: 'Красный лук', price: 59, emoji: '🧅' },
      { id: 'bell-pepper', name: 'Сладкий перец', price: 59, emoji: '🫑' },
      { id: 'olives', name: 'Оливки', price: 59, emoji: '🫒' },
      { id: 'jalapeno', name: 'Халапеньо', price: 59, emoji: '🌶️' },
      { id: 'extra-mozzarella', name: 'Доп. моцарелла', price: 79, emoji: '🧀' },
    ],
  },
  {
    name: 'Маргарита',
    description: 'Моцарелла, томаты, фирменный томатный соус, орегано',
    price: 349,
    emoji: '🍕',
    weight: '350 г',
    ingredients: [
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'tomatoes', name: 'Томаты', emoji: '🍅' },
      { id: 'tomato-sauce', name: 'Томатный соус', emoji: '🫙' },
      { id: 'oregano', name: 'Орегано', emoji: '🌿' },
    ],
    addons: [
      { id: 'parmesan', name: 'Пармезан', price: 79, emoji: '🧀' },
      { id: 'basil', name: 'Базилик', price: 39, emoji: '🌿' },
      { id: 'garlic', name: 'Чеснок', price: 39, emoji: '🧄' },
      { id: 'olives', name: 'Оливки', price: 59, emoji: '🫒' },
    ],
  },
  {
    name: 'Четыре сыра',
    description: 'Моцарелла, чеддер, пармезан, дор блю, фирменный соус',
    price: 499,
    emoji: '🍕',
    weight: '420 г',
    ingredients: [
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'cheddar', name: 'Чеддер', emoji: '🧀' },
      { id: 'parmesan', name: 'Пармезан', emoji: '🧀' },
      { id: 'dorblu', name: 'Дор блю', emoji: '🧀' },
    ],
    addons: [
      { id: 'walnuts', name: 'Грецкие орехи', price: 79, emoji: '🥜' },
      { id: 'honey', name: 'Мёд', price: 49, emoji: '🍯' },
      { id: 'arugula', name: 'Руккола', price: 49, emoji: '🥬' },
      { id: 'pear', name: 'Груша', price: 69, emoji: '🍐' },
    ],
  },
  {
    name: 'Гавайская',
    description: 'Ветчина, ананасы, моцарелла, фирменный томатный соус',
    price: 449,
    emoji: '🍕',
    weight: '410 г',
    ingredients: [
      { id: 'ham', name: 'Ветчина', emoji: '🥓' },
      { id: 'pineapple', name: 'Ананасы', emoji: '🍍' },
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'tomato-sauce', name: 'Томатный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'chicken', name: 'Курица', price: 79, emoji: '🍗' },
      { id: 'corn', name: 'Кукуруза', price: 49, emoji: '🌽' },
      { id: 'bell-pepper', name: 'Сладкий перец', price: 59, emoji: '🫑' },
      { id: 'red-onion', name: 'Красный лук', price: 59, emoji: '🧅' },
    ],
  },
  {
    name: 'Мясная',
    description: 'Пепперони, ветчина, бекон, курица, моцарелла, томатный соус',
    price: 549,
    tag: 'Хит',
    emoji: '🍕',
    weight: '500 г',
    ingredients: [
      { id: 'pepperoni', name: 'Пепперони', emoji: '🍖' },
      { id: 'ham', name: 'Ветчина', emoji: '🥓' },
      { id: 'bacon', name: 'Бекон', emoji: '🥓' },
      { id: 'chicken', name: 'Курица', emoji: '🍗' },
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'tomato-sauce', name: 'Томатный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'mushrooms', name: 'Шампиньоны', price: 59, emoji: '🍄' },
      { id: 'red-onion', name: 'Красный лук', price: 59, emoji: '🧅' },
      { id: 'jalapeno', name: 'Халапеньо', price: 59, emoji: '🌶️' },
      { id: 'cheddar', name: 'Чеддер', price: 79, emoji: '🧀' },
    ],
  },
  {
    name: 'Диабло',
    description: 'Острая пепперони, халапеньо, моцарелла, томатный соус',
    price: 479,
    tag: 'Новинка',
    emoji: '🍕',
    weight: '390 г',
    ingredients: [
      { id: 'spicy-pepperoni', name: 'Острая пепперони', emoji: '🌶️' },
      { id: 'jalapeno', name: 'Халапеньо', emoji: '🌶️' },
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'tomato-sauce', name: 'Томатный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'red-onion', name: 'Красный лук', price: 59, emoji: '🧅' },
      { id: 'chili', name: 'Перец чили', price: 49, emoji: '🌶️' },
      { id: 'cheddar', name: 'Чеддер', price: 79, emoji: '🧀' },
      { id: 'olives', name: 'Оливки', price: 59, emoji: '🫒' },
    ],
  },
  {
    name: 'Грибная',
    description: 'Шампиньоны, моцарелла, трюфельное масло, фирменный соус',
    price: 429,
    emoji: '🍕',
    weight: '380 г',
    ingredients: [
      { id: 'mushrooms', name: 'Шампиньоны', emoji: '🍄' },
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'truffle-oil', name: 'Трюфельное масло', emoji: '🫒' },
      { id: 'sauce', name: 'Фирменный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'parmesan', name: 'Пармезан', price: 79, emoji: '🧀' },
      { id: 'arugula', name: 'Руккола', price: 49, emoji: '🥬' },
      { id: 'onion', name: 'Лук', price: 59, emoji: '🧅' },
      { id: 'garlic', name: 'Чеснок', price: 39, emoji: '🧄' },
    ],
  },
  {
    name: 'Карбонара',
    description: 'Бекон, пармезан, моцарелла, сливочный соус, яйцо',
    price: 519,
    emoji: '🍕',
    weight: '430 г',
    ingredients: [
      { id: 'bacon', name: 'Бекон', emoji: '🥓' },
      { id: 'parmesan', name: 'Пармезан', emoji: '🧀' },
      { id: 'mozzarella', name: 'Моцарелла', emoji: '🧀' },
      { id: 'cream-sauce', name: 'Сливочный соус', emoji: '🫙' },
    ],
    addons: [
      { id: 'onion', name: 'Лук', price: 59, emoji: '🧅' },
      { id: 'garlic', name: 'Чеснок', price: 39, emoji: '🧄' },
      { id: 'mushrooms', name: 'Шампиньоны', price: 59, emoji: '🍄' },
      { id: 'cheddar', name: 'Чеддер', price: 79, emoji: '🧀' },
    ],
  },
]

export const sales: CatalogProduct[] = [
  { name: 'Пепперони по-деревенски', description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус', price: 399, tag: 'Хит', emoji: '🍕' },
  { name: 'Маргарита', description: 'Моцарелла, томаты, фирменный томатный соус, орегано', price: 349, tag: 'Хит', emoji: '🍕' },
  { name: 'Четыре сыра', description: 'Моцарелла, чеддер, пармезан, дор блю, фирменный соус', price: 499, tag: 'Хит', emoji: '🍕' },
  { name: 'Филадельфия ролл', description: 'Лосось, сливочный сыр, огурец, авокадо', price: 389, tag: 'Хит', emoji: '🍣' },
]

export const sushi: CatalogProduct[] = [
  { name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец, авокадо', price: 389, tag: 'Хит', emoji: '🍣' },
  { name: 'Калифорния', description: 'Крабовое мясо, авокадо, огурец, тобико', price: 349, emoji: '🍣' },
  { name: 'Дракон', description: 'Угорь, авокадо, огурец, кунжут, унаги соус', price: 459, tag: 'New', emoji: '🍣' },
  { name: 'Спайси лосось', description: 'Острый лосось, огурец, спайси соус, кунжут', price: 379, emoji: '🍣' },
]

export const drinks: CatalogProductSmall[] = [
  { name: 'Кока-Кола', price: 99, emoji: '🥤' },
  { name: 'Фанта', price: 99, emoji: '🥤' },
  { name: 'Спрайт', price: 99, emoji: '🥤' },
  { name: 'Сок апельсиновый', price: 129, portion: '0.3 л', emoji: '🧃' },
  { name: 'Сок яблочный', price: 129, portion: '0.3 л', emoji: '🧃' },
  { name: 'Молочный коктейль', price: 199, portion: '0.4 л', emoji: '🥛' },
]

export const snacks: CatalogProductSmall[] = [
  { name: 'Картофель из печи', price: 179, portion: 'Порция 95 г', emoji: '🍟' },
  { name: 'Картофель фри', price: 149, portion: 'Порция 120 г', emoji: '🍟' },
  { name: 'Куриные наггетсы', price: 199, portion: '6 шт', emoji: '🍗' },
  { name: 'Куриные крылышки', price: 269, portion: '8 шт', emoji: '🍗' },
  { name: 'Чесночный хлеб', price: 129, portion: '4 шт', emoji: '🥖' },
  { name: 'Луковые кольца', price: 159, portion: 'Порция 100 г', emoji: '🧅' },
]

export const combo: CatalogProduct[] = [
  { name: 'Семейное комбо', description: '2 пиццы 33 см + 2 напитка + картофель из печи', price: 1299, tag: 'Хит', emoji: '🍱' },
  { name: 'Комбо для двоих', description: '1 пицца 28 см + 2 напитка + закуска на выбор', price: 799, emoji: '🍱' },
  { name: 'Дружеское комбо', description: '3 пиццы 33 см + 3 напитка + 2 закуски', price: 1899, tag: 'New', emoji: '🍱' },
  { name: 'Суши сет', description: 'Филадельфия + Калифорния + Дракон + 3 соуса', price: 999, emoji: '🍱' },
]

export const desserts: CatalogProductSmall[] = [
  { name: 'Чизкейк', price: 199, emoji: '🧁' },
  { name: 'Тирамису', price: 229, emoji: '🍰' },
  { name: 'Шоколадный фондан', price: 249, emoji: '🍫' },
  { name: 'Мороженое', price: 149, portion: '2 шарика', emoji: '🍨' },
]

export const sauces: CatalogProductSmall[] = [
  { name: 'Сырный соус', price: 79, emoji: '🫙' },
  { name: 'Чесночный соус', price: 79, emoji: '🫙' },
  { name: 'Барбекю', price: 79, emoji: '🫙' },
  { name: 'Кетчуп', price: 49, emoji: '🫙' },
  { name: 'Сладкий чили', price: 79, emoji: '🫙' },
  { name: 'Ранч', price: 79, emoji: '🫙' },
]

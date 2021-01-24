import fazerMenu from './assets/fazer-menu.json';
console.log(fazerMenu);

const dataArray = [
  { name: 'Lingonberry jam', price: 4.00 },
  { name: 'Mushroom and bean casserole', price: 5.50 },
  { name: 'Chili-flavoured wheat', price: 3.00 },
  { name: 'Vegetarian soup', price: 4.80 },
  { name: 'Pureed root vegetable soup with smoked cheese', price: 8.00 }
];

/**
 * Validates meal name input
 * @param {string} mealName
 * @returns boolean
 */

const validateName = (mealName) => {
  const regexPattern = /^[A-ZÅÄÖ]{1}[a-zÅäöA-ZÅÄÖ0-9\-\ \/,()]{3,63}$/;
  return regexPattern.test(mealName);
};


/**
 * Sorts array by price
 * @param {Array} menu
 */
const sortMenuByPrice = (menu) => {
  const sortedPrice = menu.sort((min, max) => {
    return min.price - max.price;
  });
  return sortedPrice;
};

/**
 * Filters menu by price
 * @param {Array} menu
 * @param {float} price
 */

const filterMealsByPrice = (menu, price) => {
  const filtered = menu.filter(item => item.price < price);
  return filtered;
};

/**
 * Increases price of each menu item
 * @param {Array} menu
 * @param {int} percentage
 */
const increasePrice = (menu, percentage) => {
  const increasedPrice = menu.map(item => {
    return {
      name: item.name,
      price: item.price * (1 + percentage / 100)
    };
  });
  return increasedPrice;
};

/**
 * Calculates total sum of menu items
 * @param {Array} menu
 */
const totalPrice = (menu) => {
  const sum = menu.reduce((first, last) => ({ price: first.price + last.price }));
  return sum;
};

//Test all
for (const item of Object.values(dataArray)) {
  console.log('Meal name ' + item.name + ' is valid:', validateName(item.name));
}

console.log(sortMenuByPrice(dataArray));
console.log(filterMealsByPrice(dataArray, 5));
console.log(increasePrice(dataArray, 15));
console.log(totalPrice(dataArray));

//B FAZER MENU

/**
 * Filters vegan meals
 * @param {Array} menu
 */
const filterVegan = (menu) => {
  let veganMeals = [];
  for(let i = 0; i < Object.values(menu.LunchMenus[0].SetMenus).length; i++) {
      const filteredVegan = menu.LunchMenus[0].SetMenus[i].Meals.filter( (meal) => {
          return (meal.Diets.indexOf('Veg') >= 0);
      });
      veganMeals.push.apply(veganMeals, filteredVegan);
  }
  return veganMeals;
};

console.log(filterVegan(fazerMenu));

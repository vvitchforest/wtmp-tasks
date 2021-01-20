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
 */

const validateName = (mealName) => {
  const regexPattern = /^[A-Z]{1}[a-z0-9 -/\,()]{3,63}$/;
  return regexPattern.test(mealName);
};

//Sorting array by price
const temp = dataArray.slice();
const sortedPrice = temp.sort((min, max) => {
  return min.price - max.price;
});

//Displaying meals that cost less than 5 euro
const filtered = dataArray.filter(item => item.price < 5);

//Increasing price of all meals by 15%
const increasedPrice = dataArray.map(item => item.price * 1.15);

//Cost of all meals
const sum = dataArray.reduce((first, last) => ({ price: first.price + last.price }));

//Print all to console
console.log(validateName('Mus / '));
console.log(sortedPrice);
console.log(filtered);
console.log(increasedPrice);
console.log(sum);

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

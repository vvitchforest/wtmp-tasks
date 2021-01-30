import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';


const menuCard = document.querySelector('#card1');
const menuCardFazer = document.querySelector('#card2');
const main = document.querySelector('main');
const btnContainer = document.querySelector('#btn-container');
btnContainer.classList.add('btn-container');
const menuList = document.createElement('ul');
menuList.classList.add('card-menu-container');
const menuListFazer = document.createElement('ul');
menuListFazer.classList.add('card-menu-container');
const languageBtn = document.createElement('button');
languageBtn.classList.add('language-btn');
languageBtn.innerHTML = 'FI/EN';
const randomBtn = document.createElement('button');
randomBtn.classList.add('random-btn');
randomBtn.innerHTML = 'RANDOM';
const sortBtn = document.createElement('button');
sortBtn.classList.add('sort-btn');
sortBtn.innerHTML = 'SORT';

btnContainer.appendChild(languageBtn);
btnContainer.appendChild(randomBtn);
btnContainer.appendChild(sortBtn);
menuCard.appendChild(menuList);
menuCardFazer.appendChild(menuListFazer);
main.appendChild(btnContainer);

/**
 * Creates lunch menu list items into menu list
 * @param {Array} menu lunch menu array
 */

const createMenu = (menu, list) => {
  list.innerHTML = '';
  menu.forEach((course) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = course;
    list.appendChild(listItem);
  });
};

/**
 * Switches language fi/en in Sodexo menu
 */

const changeLanguage = (card, list, menuFi, menuEn) => {
  card.classList.toggle('fin');
  card.classList.toggle('eng');
  if (card.classList.contains('eng')) {
    createMenu(menuEn, list);
  } else {
    createMenu(menuFi, list);
  }
  card.appendChild(list);
};


/**
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Soreted menu array
 */
const sortAlphabetically = (menu, order) => {
  let sortedArray;
  if (order === 'asc') {
    sortedArray = menu.sort();
  } else if (order === 'desc') {
    sortedArray = menu.sort();
    sortedArray.reverse();
  }
  return sortedArray;
};

/**
 * Shows alphabetically sorted menu
 */

const showSortedMenu = (card, list, menuFi, menuEn) => {
  if (card.classList.contains('fin')) {

    createMenu(sortAlphabetically(menuFi, 'asc'), list);
  } else {
    createMenu(sortAlphabetically(menuEn, 'asc'), list);
  }
};

/**
 * Selects random dish from lunch menu
 * @param {Array} menu
 * @returns random dish name
 */
const randomCourse = (menu) => {
  const random = menu[Math.floor(Math.random() * menu.length)];
  return random;
};

/**
 * Prints random dish into html card
 */

const showRandomCourse = (card, list, menuFi, menuEn ) => {
  list.innerHTML = '';
  let listItem = document.createElement('li');
  if (card.classList.contains('fin')) {
    listItem.innerHTML = randomCourse(menuFi);
  } else {
    listItem.innerHTML = randomCourse(menuEn);
  }
  list.appendChild(listItem);
};

//Initialisation
menuCard.classList.toggle('fin');
menuCardFazer.classList.toggle('fin');
createMenu(SodexoData.coursesFi, menuList);
createMenu(FazerData.FazerDataFi.coursesFi, menuListFazer);

//Event listeners
languageBtn.addEventListener('click', () => {
  changeLanguage(menuCard, menuList, SodexoData.coursesFi, SodexoData.coursesEn);
  changeLanguage(menuCardFazer, menuListFazer, FazerData.FazerDataFi.coursesFi, FazerData.FazerDataEn.coursesEn);
});

sortBtn.addEventListener('click', () => {
  showSortedMenu(menuCard, menuList, SodexoData.coursesFi, SodexoData.coursesEn);
  showSortedMenu(menuCardFazer, menuListFazer, FazerData.FazerDataFi.coursesFi, FazerData.FazerDataEn.coursesEn);
});
randomBtn.addEventListener('click', () => {
  showRandomCourse(menuCard, menuList, SodexoData.coursesFi, SodexoData.coursesEn);
  showRandomCourse(menuCardFazer, menuListFazer, FazerData.FazerDataFi.coursesFi, FazerData.FazerDataEn.coursesEn);

});



import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';

const today = new Date().toISOString().split('T')[0];
console.log(today);

let parsedMenu;
let parsedMenuFazer;
let parsedSodexoMenuEn;
let parsedFazerMenuEn;

const menuCard = document.querySelector('#card1 .card-info-container');
const menuCardFazer = document.querySelector('#card2 .card-info-container');
const languageBtn = document.querySelector('.language-btn');
const randomBtn = document.querySelector('.random-btn');
const sortBtn = document.querySelector('.sort-btn');
const btnContainer = document.querySelector('#btn-container');
btnContainer.classList.add('btn-container');
const menuList = document.createElement('ul');
menuList.classList.add('card-menu-container');
const menuListFazer = document.createElement('ul');
menuListFazer.classList.add('card-menu-container');
menuCard.appendChild(menuList);
menuCardFazer.appendChild(menuListFazer);

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

const showRandomCourse = (card, list, menuFi, menuEn) => {
  list.innerHTML = '';
  let listItem = document.createElement('li');
  if (card.classList.contains('fin')) {
    listItem.innerHTML = randomCourse(menuFi);
  } else {
    listItem.innerHTML = randomCourse(menuEn);
  }
  list.appendChild(listItem);
};

const loadData = async() => {
  try {
    parsedMenu = await SodexoData.getMenu('fi', today);
    createMenu(parsedMenu, menuList);
  }
  catch (error){
    console.error(error);
  }

  try {
    parsedMenuFazer = await FazerData.getDailyMenu('fi', '2020-02-12');
    createMenu(parsedMenuFazer, menuListFazer);
  } catch (error){
    console.error(error);
  }

  try {
    parsedSodexoMenuEn = await SodexoData.getMenu('en', today);
    parsedFazerMenuEn = await FazerData.getDailyMenu('en', '2020-02-12');
  } catch (error) {
    console.error(error);
  }
};

const serviceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};

const init = () => {
  menuCard.classList.toggle('fin');
  menuCardFazer.classList.toggle('fin');

  loadData();

  languageBtn.addEventListener('click', () => {
    changeLanguage(menuCard, menuList, parsedMenu, parsedSodexoMenuEn);
    changeLanguage(menuCardFazer, menuListFazer, parsedMenuFazer, parsedFazerMenuEn);
  });

  sortBtn.addEventListener('click', () => {
    showSortedMenu(menuCard, menuList, parsedMenu, parsedSodexoMenuEn);
    showSortedMenu(menuCardFazer, menuListFazer, parsedMenuFazer, parsedFazerMenuEn);
  });

  randomBtn.addEventListener('click', () => {
    showRandomCourse(menuCard, menuList, parsedMenu, parsedSodexoMenuEn);
    showRandomCourse(menuCardFazer, menuListFazer, parsedMenuFazer, parsedFazerMenuEn);
  });
  //serviceWorker();
};

init();

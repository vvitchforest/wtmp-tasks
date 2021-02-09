/*if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}*/

import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import { fetchGet } from './modules/network';

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

const init = async () => {
  menuCard.classList.toggle('fin');
  menuCardFazer.classList.toggle('fin');
  const currentDay = new Date().getDay();
  console.log(currentDay);
  let dailyMenuJson;
  let weeklyMenuJsonFi;
  let weeklyMenuJsonEn;

  try {
    dailyMenuJson = await fetchGet(SodexoData.dailyUrl);
    createMenu(SodexoData.getMenu('fi', dailyMenuJson), menuList);
  }
  catch (error){
    console.error(error);
  }

  try {
    weeklyMenuJsonFi = await fetchGet(FazerData.weeklyUrlFi);
    createMenu(FazerData.getDailyMenu('fi', weeklyMenuJsonFi, currentDay ), menuListFazer);
    weeklyMenuJsonEn = await fetchGet(FazerData.weeklyUrlEn);
  } catch (error){
    console.error(error);
  }

  languageBtn.addEventListener('click', () => {
    changeLanguage(menuCard, menuList, SodexoData.getMenu('fi', dailyMenuJson), SodexoData.getMenu('en', dailyMenuJson));
    changeLanguage(menuCardFazer, menuListFazer, FazerData.getDailyMenu('fi', weeklyMenuJsonFi, currentDay) ,FazerData.getDailyMenu('en', weeklyMenuJsonEn, currentDay));
  });

  sortBtn.addEventListener('click', () => {
    showSortedMenu(menuCard, menuList, SodexoData.getMenu('fi', dailyMenuJson), SodexoData.getMenu('en', dailyMenuJson));
    showSortedMenu(menuCardFazer, menuListFazer, FazerData.getDailyMenu('fi', weeklyMenuJsonFi, currentDay) ,FazerData.getDailyMenu('en', weeklyMenuJsonEn, currentDay));
  });
  randomBtn.addEventListener('click', () => {
    showRandomCourse(menuCard, menuList, SodexoData.getMenu('fi', dailyMenuJson), SodexoData.getMenu('en', dailyMenuJson));
    showRandomCourse(menuCardFazer, menuListFazer, FazerData.getDailyMenu('fi', weeklyMenuJsonFi, currentDay) ,FazerData.getDailyMenu('en', weeklyMenuJsonEn, currentDay));

  });
};

init();

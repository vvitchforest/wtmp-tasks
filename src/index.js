import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';


const menuCard = document.querySelector('#card1');
const menuCardFazer = document.querySelector('#card2');
const main = document.querySelector('main');
const btnContainer = document.querySelector('#btn-container');
btnContainer.classList.add('btn-container');
const menuList = document.createElement('ul');
const menuListFazer = document.createElement('ul');
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


/*const createMenuFazer = (menu) => {
  menuListFazer.innerHTML = '';
  menu.forEach((course) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = course;
    menuListFazer.appendChild(listItem);
  });
};*/

console.log(FazerData);

/**
 * Switches language fi/en
 */

const changeLanguage = () => {
  menuCard.classList.toggle('fin');
  menuCard.classList.toggle('eng');
  if (menuCard.classList.contains('eng')) {
    createMenu(SodexoData.coursesEn, menuList);
  } else {
    createMenu(SodexoData.coursesFi, menuList);
  }
  menuCard.appendChild(menuList);
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

const showSortedMenu = () => {
  if (menuCard.classList.contains('fin')) {
    createMenu(sortAlphabetically(SodexoData.coursesFi, 'asc'));
  } else {
    createMenu(sortAlphabetically(SodexoData.coursesEn, 'asc'));
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

const showRandomCourse = () => {
  menuList.innerHTML = '';
  let listItem = document.createElement('li');
  if (menuCard.classList.contains('fin')) {
    listItem.innerHTML = randomCourse(SodexoData.coursesFi);
  } else {
    listItem.innerHTML = randomCourse(SodexoData.coursesEn);
  }
  menuList.appendChild(listItem);
};

console.log(FazerData.maanantai);

//Initialisation
menuCard.classList.toggle('fin');
createMenu(SodexoData.coursesFi, menuList);
console.log(FazerData);
createMenu(FazerData.FazerDataFi.coursesFi, menuListFazer);

//Event listeners
languageBtn.addEventListener('click', changeLanguage);
sortBtn.addEventListener('click', showSortedMenu);
randomBtn.addEventListener('click', showRandomCourse);

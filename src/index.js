import menuData from './assets/menu.json';
console.log(menuData);

const menuCard = document.querySelector('#card1');
const languageBtn = document.createElement('button');
languageBtn.classList.add('language-btn');
languageBtn.innerHTML = 'FI/EN';

let coursesFi = [];
let coursesEn = [];

for(let i = 1; i <= Object.values(menuData.courses).length; i++) {
  coursesFi.push(menuData.courses[i].title_fi);
  coursesEn.push(menuData.courses[i].title_en);
}

let menuList = document.createElement('ul');

const createMenu = (menu) => {
  menuList.innerHTML = '';
  menu.forEach((course) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = course;
    menuList.appendChild(listItem);
  });
};

createMenu(coursesFi);

menuCard.appendChild(menuList);
menuCard.appendChild(languageBtn);
menuCard.classList.toggle('fin');

const changeLanguage = () => {
  menuCard.classList.toggle('fin');
    menuCard.classList.toggle('eng');
  if(menuCard.classList.contains('eng')) {
    createMenu(coursesEn);
  } else {
    createMenu(coursesFi);
  }
  menuCard.appendChild(menuList);
};

languageBtn.addEventListener('click', changeLanguage);

const sortBtn = document.createElement('button');
sortBtn.classList.add('sort-btn');
sortBtn.innerHTML = 'SORT';
menuCard.appendChild(sortBtn);

const sortAlphabetically = (menu, order) => {
  let sortedArray;
  if(order === 'asc') {
    sortedArray = menu.sort();
  } else if (order === 'desc') {
    sortedArray = menu.sort();
    sortedArray.reverse();
  }
  return sortedArray;
};

sortBtn.addEventListener('click', () => {
  if(menuCard.classList.contains('fin')) {
    createMenu(sortAlphabetically(coursesFi, 'asc'));
  } else {
    createMenu(sortAlphabetically(coursesEn, 'asc'));
  }
});

const randomBtn = document.createElement('button');
randomBtn.classList.add('random-btn');
randomBtn.innerHTML = 'RANDOM';
menuCard.appendChild(randomBtn);

const randomCourse = (menu) => {
  const random = menu[Math.floor(Math.random() * menu.length)];
  return random;
};

randomBtn.addEventListener('click', () => {
    menuList.innerHTML = '';
    let listItem = document.createElement('li');
  if(menuCard.classList.contains('fin')) {
    listItem.innerHTML = randomCourse(coursesFi);
  } else {
    listItem.innerHTML = randomCourse(coursesEn);
  }
    menuList.appendChild(listItem);
});

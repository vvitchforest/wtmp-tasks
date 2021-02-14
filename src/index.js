
import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';

const today = new Date().toISOString().split('T')[0];
console.log(today);

//let languageSetting = 'fi';

const menuCard = document.querySelector('#card1 .card-info-container');
const menuCardFazer = document.querySelector('#card2 .card-info-container');
const languageBtn = document.querySelector('.language-btn');
const btnContainer = document.querySelector('#btn-container');
btnContainer.classList.add('btn-container');
const menuList = document.createElement('ul');
menuList.classList.add('card-menu-container');
const menuListFazer = document.createElement('ul');
menuListFazer.classList.add('card-menu-container');
menuCard.appendChild(menuList);
menuCardFazer.appendChild(menuListFazer);
const modeToggle = document.getElementById('checkbox');

let userSettings = {
  colorTheme: 'light',
  lang: 'fi'
};


/**
 * Updates user settings
 */
const updateUserSettings = () => {
  localStorage.setItem('userConfig', JSON.stringify(userSettings));
};

/**
 * Switches colour theme
 */

const switchTheme = (event) => {
  if(event.target.checked) {
    userSettings.colorTheme = 'dark';
  } else {
   userSettings.colorTheme = 'light';
  }
  document.querySelector('body').setAttribute('data-theme', userSettings.colorTheme);
  updateUserSettings();
};

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

const switchLanguage = () => {
  if (userSettings.lang === 'fi') {
    userSettings.lang = 'en';
  } else {
    userSettings.lang = 'fi';
  }
  updateUserSettings();
  loadData();
};

const loadData = async () => {
  try {
    const parsedMenu = await SodexoData.getMenu(userSettings.lang, today);
    createMenu(parsedMenu, menuList);
  }
  catch (error) {
    console.error(error);
  }
  try {
    const parsedMenu = await FazerData.getDailyMenu(userSettings.lang, today);
    console.log(parsedMenu);
    createMenu(parsedMenu, menuListFazer);
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
  //Load from local storage if exists or use default user settings
  if(localStorage.getItem('userConfig')) {
    userSettings = JSON.parse(localStorage.getItem("userConfig"));
    document.querySelector('body').setAttribute('data-theme', userSettings.colorTheme);
    if(userSettings.colorTheme === 'dark') {
      modeToggle.checked = true;
    }
  }

  loadData();
  modeToggle.addEventListener('change', switchTheme, false);
  languageBtn.addEventListener('click', switchLanguage);
  serviceWorker();
};

init();

let date = new Date();
date.setFullYear(date.getFullYear() - 1);
date = date.toISOString().split('T')[0];
console.log(date);

const weeklyUrlFi = `https://www.fazerfoodco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${date}`;
const weeklyUrlEn = `https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${date}`;


const parseMenu = (menuData) => {
  let meals = [];
  if (menuData.LunchMenus != null && menuData.LunchMenus.length > 0) {
    console.log(menuData);
    menuData.LunchMenus[0].SetMenus.forEach((setMenu) => {
      meals.push(setMenu);
    });
  }
  return meals;
};

const joinMeals = (parsedMenu, lang) => {
  let coursesArray = [];
  if (parsedMenu.length < 1) {

    if(lang === 'fi') {
      coursesArray.push('Tälle päivälle ei löytynyt aterioita');
    } else {
      coursesArray.push('No meals were found for this day');
    }

  } else {
    parsedMenu.forEach((setMenu) => {
      const meals = setMenu.Meals.map(x => x.Name).join(", ");
      coursesArray.push(meals);
    });
  }
  return coursesArray;
};

const getDailyMenu = (lang, data) => {
  return (lang === 'fi') ?
    joinMeals(parseMenu(data), 'fi') :
    joinMeals(parseMenu(data), 'en');
};

const FazerData = { getDailyMenu, weeklyUrlFi, weeklyUrlEn };

export default FazerData;

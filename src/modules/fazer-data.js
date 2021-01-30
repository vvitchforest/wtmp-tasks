import FazerMenuFi from '../assets/fazer-menu-fi.json';
import FazerMenuEn from '../assets/fazer-menu-en.json';

let coursesEn = [];
let coursesFi = [];

const parseMenu = (menuData) => {
  let meals = [];
  menuData.LunchMenus[0].SetMenus.forEach((setMenu) => {
    meals.push(setMenu);
  });
  return meals;
};

const joinMeals = (parsedMenu, coursesArray) => {
parsedMenu.forEach((setMenu) => {
  const meals = setMenu.Meals.map(x => x.Name).join(", ");
  coursesArray.push(meals);
});
};

const parsedFi = parseMenu(FazerMenuFi);
const parsedEn = parseMenu(FazerMenuEn);
joinMeals(parsedFi, coursesFi);
joinMeals(parsedEn, coursesEn);

const FazerDataFi = {coursesFi};
const FazerDataEn = {coursesEn};

const FazerData = {
  FazerDataFi: FazerDataFi,
  FazerDataEn: FazerDataEn,
};

export default FazerData;

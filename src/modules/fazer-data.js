import FazerMenuFi from '../assets/fazer-menu-fi.json';
import FazerMenuEn from '../assets/fazer-menu-en.json';

console.log(FazerMenuEn);
let coursesEn = [];
let coursesFi = [];

const parseFazerMenuFi = (menuFi) => {
  let mealsFi = [];
  menuFi.LunchMenus[0].SetMenus.forEach((setMenu) => {
    mealsFi.push(setMenu);
  });
  return mealsFi;
};

const parseFazerMenuEn = (menuEn) => {
  let mealsEn = [];
  menuEn.LunchMenus[0].SetMenus.forEach((setMenu) => {
    mealsEn.push(setMenu);
  });
  return mealsEn;
};


const joinMealsFi = (parsedMenu, coursesTarget) => {

  parsedMenu.forEach((setMenu) => {
    let mealString = "";
    setMenu.Meals.forEach((meal) => {
      mealString += meal.Name + ", ";
    });
    mealString = mealString.slice(0, (mealString.length - 2));
    if (coursesTarget === 'fin') {
      coursesFi.push(mealString);
    } else if (coursesTarget === 'eng') {
      coursesEn.push(mealString);
    }
  });
};

const parsedFi = parseFazerMenuFi(FazerMenuFi);
const parsedEn = parseFazerMenuEn(FazerMenuEn);
joinMealsFi(parsedFi, 'fin');
joinMealsFi(parsedEn, 'eng');


const FazerDataFi = { coursesFi };
const FazerDataEn = { coursesEn };

const FazerData = {
  FazerDataFi: FazerDataFi,
  FazerDataEn: FazerDataEn,

};

export default FazerData;




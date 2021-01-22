import menuData from '../assets/menu.json';
console.log(menuData);

let coursesFi = [];
let coursesEn = [];

/**
 * Parses course arrays from Sodexo menu
 * @param {Object} sodexoMenu
 */
const parseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  courses.forEach((course) => {
    coursesFi.push(course.title_fi);
    coursesEn.push(course.title_en);
  });
};

parseSodexoMenu(menuData.courses);
const SodexoData = {coursesEn, coursesFi};

export default SodexoData;

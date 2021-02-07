const today = new Date().toISOString().split('T')[0];
console.log(today);
const dailyUrl = `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`;

/**
 * Parses course arrays from Sodexo menu
 * @param {Object} sodexoMenu
 * @returns {Object} parsed menu arrays
 */
const parseSodexoMenu = (sodexoMenu) => {
  const coursesFi = [];
  const coursesEn = [];

  if (sodexoMenu == null) {
    coursesFi.push('Tälle päivälle ei löytynyt aterioita');
    coursesEn.push('No meals were found for this day');
  } else {
    const courses = Object.values(sodexoMenu);
    courses.forEach((course) => {
      coursesFi.push(course.title_fi);
      coursesEn.push(course.title_en);
    });
  }
  return { fi: coursesFi, en: coursesEn };
};

const getMenu = (lang, data) => {
  const parsedMenu = parseSodexoMenu(data.courses);
  return (lang === 'fi') ? parsedMenu.fi : parsedMenu.en;
};

const SodexoData = { getMenu, dailyUrl };
export default SodexoData;

import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
const launchParams = retrieveLaunchParams();

const langcode =
  launchParams.initData?.user?.languageCode == "ru" ? "ru" : "en";

const lang = {
  isad: { ru: "я плачу", en: "Im crying" },
  ilovely: { ru: "мне одиноко", en: "Im lonely." },
  alluser: { ru: "всего пользователей:", en: "total users:" },
  alllonely: { ru: "чувствуют себя одиноко сейчас:", en: "Feels lonely now:" },
  allsad: { ru: "чувствуют себя грустно сейчас:", en: "Feels sad now:" },
};

export default {
  isad: lang.isad[langcode],
  ilovely: lang.ilovely[langcode],
  alluser: lang.alluser[langcode],
  alllonely: lang.alllonely[langcode],
  allsad: lang.allsad[langcode],
};

import i18n from "i18next";

import { HomeEN } from "@/languages/Home/en";
import { HomeJA } from "@/languages/Home/ja";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: HomeEN,
	},
	ja: {
		translation: HomeJA,
	},
};

i18n.use(initReactI18next).init({
	resources,

	lng: "ja",
	fallbackLng: "en",

	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationGB from './locales/gb/translation.json';
import translationEE from './locales/ee/translationee.json';
import translationRU from './locales/ru/translation.json';

// the translations
const resources = {
  gb: {
    translation: translationGB
  },

  ee: {
    translation: translationEE
  },

  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

  });

export default i18n;
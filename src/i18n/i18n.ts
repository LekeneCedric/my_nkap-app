import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {de, en, fr} from "./langs";

const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    },
    de: {
        translation: de
    }
};

i18next
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        resources: resources,
    });

export default i18next;
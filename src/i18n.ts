import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lang/en.json";
import nl from "./lang/nl.json";

const resources = {
    "en": {
        ofluidata: {
            ...en
        }
    },
    "nl": {
        ofluidata: {
            ...nl
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        defaultNS: "ofluidata",
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18nConfig from "../i18n";

export const useLanguage = ((language?: string) => {
    const { t, i18n } = useTranslation('ofluidata', { i18n: i18nConfig });
   
    useEffect(() => {
        if (language != undefined
            && i18n.language !== language) {
            i18n.changeLanguage(language);
        }

    }, [language]);

    return { t, i18n };
});
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";

interface useCustomTranslationBehaviour {
    translate: TFunction<"translation", undefined>,
    changeLanguage: (lang: string) => void,
    currentLanguage: string,
}
const useCustomTranslation = (): useCustomTranslationBehaviour => {
    const {t, i18n} = useTranslation();
    const currentLanguage = i18n.language;
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }
    return {
        translate: t,
        changeLanguage: changeLanguage,
        currentLanguage: currentLanguage
    }
};

export default useCustomTranslation;
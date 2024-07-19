import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './locale/en.json'
import ptJSON from './locale/az.json'
i18n.use(initReactI18next).init({
    debug: true,
    resources: {
        en: { ...enJSON },
        az: { ...ptJSON },
      }, 
    lng: localStorage.getItem('lng')||"en",
});
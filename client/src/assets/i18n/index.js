import i18n from "i18next";
import { initReactI18next } from "react-i18next";

//import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import de from "./locales/de/translations.json";
import en from "./locales/en/translations.json";
import es from "./locales/es/translations.json";
import fr from "./locales/fr/translations.json";
import id from "./locales/id/translations.json";
import it from "./locales/it/translations.json";
import ja from "./locales/ja/translations.json";
import nl from "./locales/nl/translations.json";
import pt from "./locales/pt/translations.json";
import ro from "./locales/ro/translations.json";
import ru from "./locales/ru/translations.json";
import tr from "./locales/tr/translations.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    //lng: "en", // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      de: { translation: de },
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      id: { translation: id },
      it: { translation: it },
      ja: { translation: ja },
      nl: { translation: nl },
      pt: { translation: pt },
      ro: { translation: ro },
      ru: { translation: ru },
      tr: { translation: tr },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;

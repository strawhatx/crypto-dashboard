import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const loadPath = `./locales/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: [
      "de",
      "en",
      "es",
      "fr",
      "id",
      "it",
      "ja",
      "ms",
      "nl",
      "pt",
      "ro",
      "ru",
      tr,
    ],

    // for all available options read the backend's repository readme file
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  });

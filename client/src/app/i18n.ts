import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export type SupportedLngsType = ["en", "uk"];

export const supportedLngs: SupportedLngsType = ["en", "uk"];
export const localeNames = {
  en: "English",
  uk: "Українська",
};

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    fallbackLng: "en",
    supportedLngs,
  })
  .then(() => {});

export default i18n;

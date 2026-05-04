import { useTranslation } from "react-i18next";
import { supportedLngs } from "@/app/i18n.ts";

export function useLocaleChange() {
  const { i18n } = useTranslation();
  const locales = supportedLngs;
  const currentLocale = i18n.language;

  const localeChange = (locale: string) => {
    i18n.changeLanguage(locale).then(() => {});
  };

  return { localeChange, locales, currentLocale };
}

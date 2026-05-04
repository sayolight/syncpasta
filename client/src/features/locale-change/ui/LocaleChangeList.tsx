import { useLocaleChange } from "@/features/locale-change/model/useLocaleChange.ts";
import { localeNames } from "@/app/i18n.ts";
import { Button } from "@ui/button";

export function LocaleChangeList() {
  const { localeChange, locales, currentLocale } = useLocaleChange();
  return locales.map((locale, index) => (
    <Button
      key={index}
      onClick={() => localeChange(locale)}
      variant={currentLocale === locale ? "primary" : "secondary"}
    >
      {localeNames[locale]}
    </Button>
  ));
}

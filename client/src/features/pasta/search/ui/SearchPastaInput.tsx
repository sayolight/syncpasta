import { Input } from "@ui/input";
import type { ChangeEvent } from "react";
import { usePastaSearch } from "@/features/pasta/search/model/usePastaSearch.ts";
import { useTranslation } from "react-i18next";

export function SearchPastaInput() {
  const { pastaSearch } = usePastaSearch();
  const { t } = useTranslation();

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    pastaSearch(e.target.value).then();
  };

  return (
    <Input
      title={t("pasta.search.input.title")}
      placeholder={t("pasta.search.input.placeholder")}
      onChange={search}
    ></Input>
  );
}

import { Input } from "@ui/input";
import { type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { usePastas } from "@/entities/pasta/api/usePastas.ts";

interface SearchPastaInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchPastaInput({ query, setQuery }: SearchPastaInputProps) {
  usePastas(query);
  const { t } = useTranslation();

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Input
      title={t("pasta.search.input.title")}
      placeholder={t("pasta.search.input.placeholder")}
      onChange={search}
    ></Input>
  );
}

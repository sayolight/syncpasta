import { Input } from "@ui/input";
import type { ChangeEvent } from "react";
import { usePastaSearch } from "@/features/pasta/search/model/usePastaSearch.ts";

export function SearchPastaInput() {
  const { pastaSearch } = usePastaSearch();

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    pastaSearch(e.target.value).then();
  };

  return (
    <Input
      title={"search"}
      placeholder={"where is my funny gif with monkeys..."}
      onChange={search}
    ></Input>
  );
}

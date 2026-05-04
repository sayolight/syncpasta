import { Block } from "@ui/block";
import PastaBoard from "@/widgets/pasta-board/ui/PastaBoard.tsx";
import { Button } from "@ui/button";
import { useState } from "react";
import { SearchPastaInput } from "@/features/pasta/search/ui/SearchPastaInput.tsx";
import { CreatePastaForm } from "@/features/pasta";
import { useTranslation } from "react-i18next";

export default function GalleryPage() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Block isCard={false}>
      <Block>
        <SearchPastaInput />
        <Button variant={"primary"} onClick={() => setIsOpen(true)}>
          {t("pasta.create.button")}
        </Button>
      </Block>
      <PastaBoard />
      <CreatePastaForm isOpen={isOpen} setIsOpen={setIsOpen}></CreatePastaForm>
    </Block>
  );
}

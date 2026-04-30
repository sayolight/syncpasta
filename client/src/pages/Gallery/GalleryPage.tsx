import { Block } from "@ui/block";
import PastaBoard from "@/widgets/pasta-board/ui/PastaBoard.tsx";
import { Button } from "@ui/button";
import { useState } from "react";
import { SearchPastaInput } from "@/features/pasta/search/ui/SearchPastaInput.tsx";
import { CreatePastaForm } from "@/features/pasta";

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Block isCard={false}>
      <Block>
        <SearchPastaInput />
        <Button variant={"primary"} onClick={() => setIsOpen(true)}>
          + create a new pasta
        </Button>
      </Block>
      <PastaBoard />
      <CreatePastaForm isOpen={isOpen} setIsOpen={setIsOpen}></CreatePastaForm>
    </Block>
  );
}

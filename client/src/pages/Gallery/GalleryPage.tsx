import { Block } from "@ui/block";
import PastaBoard from "@/widgets/pasta-board/ui/PastaBoard.tsx";
import { Button } from "@ui/button";
import { CreatePastaForm } from "@/features/pasta/create/ui/CreatePastaForm.tsx";
import { useEffect, useState } from "react";
import { getPasta } from "@/entities/pasta/api/getPasta.ts";
import type { Pasta } from "@/entities/pasta";

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [pasta, setPasta] = useState<Pasta[]>([]);

  const fetchPasta = async () => {
    const res = await getPasta();
    setPasta(res.data);
  };

  useEffect(() => {
    fetchPasta().then();
  }, []);

  return (
    <Block isCard={false}>
      <Button variant={"primary"} onClick={() => setIsOpen(true)}>
        + create a new pasta
      </Button>
      <PastaBoard pasta={pasta} />
      <CreatePastaForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCreated={fetchPasta}
      ></CreatePastaForm>
    </Block>
  );
}

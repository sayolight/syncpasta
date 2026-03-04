import { Block } from "@ui/block";
import PastaBoard from "@/widgets/pasta-board/ui/PastaBoard.tsx";
import { Button } from "@ui/button";
import { CreatePastaForm } from "@/features/pasta/create/ui/CreatePastaForm.tsx";
import { type ChangeEvent, useEffect, useState } from "react";
import { getPasta } from "@/entities/pasta/api/getPasta.ts";
import type { Pasta } from "@/entities/pasta";
import { Input } from "@ui/input";

export default function GalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [pasta, setPasta] = useState<Pasta[]>([]);

  const fetchPasta = async (query?: string) => {
    const res = await getPasta(query);
    setPasta(res.data);
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    fetchPasta(e.target.value).then();
  };

  useEffect(() => {
    fetchPasta().then();
  }, []);

  return (
    <Block isCard={false}>
      <Block>
        <Input
          title={"search"}
          placeholder={"where is my funny gif with monkeys..."}
          onChange={search}
        ></Input>
        <Button variant={"primary"} onClick={() => setIsOpen(true)}>
          + create a new pasta
        </Button>
      </Block>
      <PastaBoard pasta={pasta} />
      <CreatePastaForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCreated={fetchPasta}
      ></CreatePastaForm>
    </Block>
  );
}

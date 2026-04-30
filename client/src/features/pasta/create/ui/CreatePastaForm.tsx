import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import * as React from "react";
import { useCreatePasta } from "@/features/pasta/create/model/useCreatePasta.ts";
import { Alert } from "@ui/alert";

interface CreatePastaFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreatePastaForm({ isOpen, setIsOpen }: CreatePastaFormProps) {
  const { createPasta, isLoading, error } = useCreatePasta();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createPasta(formData);
    setIsOpen(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        active={isOpen}
        onClose={() => setIsOpen(false)}
        title={"create pasta"}
      >
        {error && <Alert title={"⚠ error!"}>{error}</Alert>}
        <Input
          title={"keywords"}
          placeholder={"hello world"}
          name={"keywords"}
          disabled={isLoading}
        ></Input>
        <Input
          title={"text (optional)"}
          placeholder={"hello ur computer has virus"}
          name={"text"}
          disabled={isLoading}
        ></Input>
        <Input
          title={"file"}
          type={"file"}
          name={"file"}
          disabled={isLoading}
        ></Input>
        <Button type={"submit"} variant={"primary"} disabled={isLoading}>
          create
        </Button>
      </Modal>
    </form>
  );
}

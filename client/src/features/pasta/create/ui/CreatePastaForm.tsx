import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import * as React from "react";
import { useCreatePasta } from "@/features/pasta/create/model/useCreatePasta.ts";
import { Alert } from "@ui/alert";
import { useTranslation } from "react-i18next";

interface CreatePastaFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreatePastaForm({ isOpen, setIsOpen }: CreatePastaFormProps) {
  const { t } = useTranslation();
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
        title={t("pasta.create.title")}
      >
        {error && <Alert title={"⚠ error!"}>{error}</Alert>}
        <Input
          title={t("pasta.create.keywords.title")}
          placeholder={t("pasta.create.keywords.placeholder")}
          name={"keywords"}
          disabled={isLoading}
        ></Input>
        <Input
          title={t("pasta.create.text.title")}
          placeholder={t("pasta.create.text.placeholder")}
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
          {t("pasta.create.confirm")}
        </Button>
      </Modal>
    </form>
  );
}

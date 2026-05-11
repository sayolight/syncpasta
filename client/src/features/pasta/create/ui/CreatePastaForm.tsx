import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useCreatePasta } from "@/entities/pasta/api/useCreatePasta.ts";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

interface CreatePastaFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreatePastaForm({ isOpen, setIsOpen }: CreatePastaFormProps) {
  const { t } = useTranslation();
  // const { createPasta, isLoading, error } = useCreatePasta();
  const { error, isPending, mutate } = useCreatePasta();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate(formData, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        active={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("pasta.create.title")}
      >
        <ErrorAlert error={error} fieldLocale={"pasta.create"} />
        <Input
          title={t("pasta.create.keywords.title")}
          placeholder={t("pasta.create.keywords.placeholder")}
          name={"keywords"}
          disabled={isPending}
        ></Input>
        <Input
          title={t("pasta.create.text.title")}
          placeholder={t("pasta.create.text.placeholder")}
          name={"text"}
          disabled={isPending}
        ></Input>
        <Input
          title={"file"}
          type={"file"}
          name={"file"}
          disabled={isPending}
        ></Input>
        <Button type={"submit"} variant={"primary"} disabled={isPending}>
          {t("pasta.create.confirm")}
        </Button>
      </Modal>
    </form>
  );
}

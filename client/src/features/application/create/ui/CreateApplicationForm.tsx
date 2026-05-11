import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateApplication } from "@/entities/application/api/useCreateApplication.ts";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

interface CreateApplicationFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreateApplicationForm({
  isOpen,
  setIsOpen,
}: CreateApplicationFormProps) {
  const { t } = useTranslation();
  const { isPending, error, mutate } = useCreateApplication();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name,
        description,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        active={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("application.create.title")}
      >
        <ErrorAlert error={error} fieldLocale={"application.create"} />
        <Input
          title={t("application.create.name.title")}
          placeholder={t("application.create.name.placeholder")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={isPending}
        ></Input>
        <Input
          title={t("application.create.description.title")}
          placeholder={t("application.create.description.placeholder")}
          disabled={isPending}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input>
        <Button type={"submit"} variant={"primary"} disabled={isPending}>
          {t("application.create.confirm")}
        </Button>
      </Modal>
    </form>
  );
}

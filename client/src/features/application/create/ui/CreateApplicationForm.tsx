import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useCreateApplication } from "@/features/application/create/model/useCreateApplication.ts";
import { Alert } from "@ui/alert";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreateApplicationFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreateApplicationForm({
  isOpen,
  setIsOpen,
}: CreateApplicationFormProps) {
  const { t } = useTranslation();
  const { createApplication, isLoading, error } = useCreateApplication();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createApplication({
      name,
      description,
    });
    setName("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        active={isOpen}
        onClose={() => setIsOpen(false)}
        title={t("application.create.title")}
      >
        {error && <Alert title={"⚠ error!"}>{error}</Alert>}
        <Input
          title={t("application.create.name.title")}
          placeholder={t("application.create.name.placeholder")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={isLoading}
        ></Input>
        <Input
          title={t("application.create.description.title")}
          placeholder={t("application.create.description.placeholder")}
          disabled={isLoading}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input>
        <Button type={"submit"} variant={"primary"} disabled={isLoading}>
          {t("application.create.confirm")}
        </Button>
      </Modal>
    </form>
  );
}

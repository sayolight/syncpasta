import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Alert } from "@ui/alert";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateApplication } from "@/entities/application/api/useCreateApplication.ts";
import { Typography } from "@/shared/ui";

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
        {error && (
          <Alert title={t(`error.${error.code}`)}>
            {error.details.map((detail) => (
              <Typography key={detail.field}>
                {t("validation.field")}{" "}
                <b>
                  &#34;
                  {t(`application.create.${detail.field}.title`)}&#34;
                </b>
                {detail.errors.map((e) => (
                  <>
                    <br />
                    <span key={e}>- {t(`validation.${e}`)}</span>
                  </>
                ))}
              </Typography>
            ))}
          </Alert>
        )}
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

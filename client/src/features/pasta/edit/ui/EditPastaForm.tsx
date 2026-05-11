import { Modal } from "@ui/modal";
import { type Pasta } from "@/entities/pasta";
import styles from "@/entities/pasta/ui/Pasta.module.scss";
import { Input, Textarea } from "@ui/input";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useEditPasta } from "@/entities/pasta/api/useEditPasta.ts";
import { useRemovePasta } from "@/entities/pasta/api/useRemovePasta.ts";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

interface EditPastaFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  pasta: Pasta;
}

export function EditPastaForm({
  isOpen,
  setIsOpen,
  pasta,
}: EditPastaFormProps) {
  const { t } = useTranslation();
  const { error, isPending, mutate: editMutate } = useEditPasta();
  const { mutate: removeMutate } = useRemovePasta();
  const [keywords, setKeywords] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setText(pasta.text || "");
    setKeywords(pasta.keywords || "");
  }, [pasta]);

  const onEditSubmit = () => {
    editMutate(
      { id: pasta.id, data: { keywords, text } },
      {
        onSuccess: () => setIsOpen(false),
      },
    );
  };

  const onRemoveSubmit = () => {
    removeMutate(pasta.id, {
      onSuccess: () => setIsOpen(false),
    });
  };

  return (
    <Modal
      title={t("pasta.edit.title")}
      active={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ErrorAlert error={error} fieldLocale={"pasta.edit"} />
      {pasta.file?.mimetype.split("/")[0] === "image" && (
        <img
          className={styles.pasta__media}
          src={pasta.file.url}
          alt={pasta.keywords}
          style={{
            maxWidth: "100%",
            maxHeight: "40vh",
          }}
        />
      )}
      {pasta.file?.mimetype.split("/")[0] === "video" && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          controls
          style={{
            maxWidth: "100%",
            maxHeight: "40vh",
          }}
        >
          <source src={pasta.file.url} type={pasta.file.mimetype} />
          Your browser does not support the video tag.
        </video>
      )}
      <Textarea
        title={t("pasta.edit.text")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isPending}
      ></Textarea>
      <Input
        title={t("pasta.edit.keywords.title")}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        disabled={isPending}
      ></Input>
      <Button variant={"primary"} onClick={onEditSubmit} disabled={isPending}>
        {t("pasta.edit.button.edit")}
      </Button>
      <Button variant={"warning"} onClick={onRemoveSubmit} disabled={isPending}>
        {t("pasta.edit.button.delete")}
      </Button>
    </Modal>
  );
}

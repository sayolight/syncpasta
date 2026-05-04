import { Modal } from "@ui/modal";
import { type Pasta } from "@/entities/pasta";
import styles from "@/entities/pasta/ui/Pasta.module.scss";
import { Input, Textarea } from "@ui/input";
import { Button } from "@ui/button";
import { useEditPasta } from "@/features/pasta/edit/model/useEditPasta.ts";
import { Alert } from "@ui/alert";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { editPasta, removePasta, isLoading, error } = useEditPasta();
  const [keywords, setKeywords] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setText(pasta.text || "");
    setKeywords(pasta.keywords || "");
  }, [pasta]);

  return (
    <Modal
      title={t("pasta.edit.title")}
      active={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
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
      {/*<Input*/}
      {/*  title={"text"}*/}
      {/*  value={text}*/}
      {/*  onChange={(e) => setText(e.target.value)}*/}
      {/*  disabled={isLoading}*/}
      {/*></Input>*/}
      <Textarea
        title={t("pasta.edit.text")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      ></Textarea>
      <Input
        title={t("pasta.edit.keywords")}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        disabled={isLoading}
      ></Input>
      <Button
        variant={"primary"}
        onClick={() => editPasta(pasta.id, { keywords, text })}
        disabled={isLoading}
      >
        {t("pasta.edit.button.edit")}
      </Button>
      <Button
        variant={"warning"}
        onClick={() => removePasta(pasta.id)}
        disabled={isLoading}
      >
        {t("pasta.edit.button.delete")}
      </Button>
    </Modal>
  );
}

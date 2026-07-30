import styles from "./Pasta.module.scss";
import type { Pasta } from "@/entities/pasta/model/types.ts";
import { Typography } from "@/shared/ui";
import * as React from "react";

interface PastaProps extends React.HTMLAttributes<HTMLButtonElement> {
  pasta: Pasta;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function PastaCard({ pasta, onClick }: PastaProps) {
  return (
    <button className={styles.pasta} onClick={onClick} type="button">
      {pasta.file?.mimetype.split("/")[0] === "image" && (
        <img
          className={styles.pasta__media}
          src={pasta.file.url}
          alt={pasta.keywords}
        />
      )}
      {pasta.file?.mimetype.split("/")[0] === "video" && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls className={styles.pasta__media}>
          <source src={pasta.file.url} type={pasta.file.mimetype} />
          Your browser does not support the video tag.
        </video>
      )}
      {pasta.text && (
        <Typography className={styles.pasta__text}>{pasta.text}</Typography>
      )}
      <Typography variant={"muted"} className={styles.pasta__description}>
        {pasta.keywords}
      </Typography>
    </button>
  );
}

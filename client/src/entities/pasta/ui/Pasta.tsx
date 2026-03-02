import styles from "./Pasta.module.scss";
import type { Pasta } from "@/entities/pasta/model/types.ts";
import { Typography } from "@/shared/ui";
import * as React from "react";

interface PastaProps extends React.HTMLAttributes<HTMLDivElement> {
  pasta: Pasta;
}

export function PastaCard({ pasta }: PastaProps) {
  return (
    <div className={styles.pasta}>
      {pasta.fileUrl && (
        <img
          className={styles.pasta__media}
          src={pasta.fileUrl}
          alt={pasta.description}
        />
      )}
      {pasta.text && <Typography>{pasta.text}</Typography>}
      <Typography variant={"muted"} className={styles.pasta__description}>
        {pasta.description}
      </Typography>
    </div>
  );
}

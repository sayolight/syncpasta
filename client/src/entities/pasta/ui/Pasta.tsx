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
      {/*{pasta.file && pasta.file.mimetype === "image/png" && (*/}
      {/*  <img*/}
      {/*    className={styles.pasta__media}*/}
      {/*    src={pasta.file.url}*/}
      {/*    alt={pasta.keywords}*/}
      {/*  />*/}
      {/*)}*/}
      {pasta.file?.mimetype.split("/")[0] === "image" && (
        <img
          className={styles.pasta__media}
          src={pasta.file.url}
          alt={pasta.keywords}
        />
      )}
      {pasta.file?.mimetype.split("/")[0] === "video" && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          controls
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
          }}
        >
          <source src={pasta.file.url} type={pasta.file.mimetype} />
          Your browser does not support the video tag.
        </video>
      )}
      {pasta.text && <Typography>{pasta.text}</Typography>}
      <Typography variant={"muted"} className={styles.pasta__description}>
        {pasta.keywords}
      </Typography>
    </div>
  );
}

import { Typography } from "@/shared/ui";
import styles from "./Illustration.module.scss";
import * as React from "react";
import { clsx } from "clsx";

const IMAGES = {
  empty: {
    width: 242,
    height: 190,
    src: "./empty.webp",
    alt: "empty",
  },
  "404": {
    width: "649px",
    height: "531px",
    src: "./404.webp",
    alt: "404 not found",
  },
};

interface IllustrationProps extends React.InputHTMLAttributes<HTMLInputElement> {
  image: "empty" | "404";
  title?: string;
}

export function Illustration({ image, title, ...props }: IllustrationProps) {
  const data = IMAGES[image];
  return (
    <div className={clsx(styles.illustration)} {...props}>
      <img
        src={data.src}
        alt={data.alt}
        height={data.height}
        width={data.width}
      />
      <Typography
        className={clsx(styles.caption)}
        weight={"bold"}
        align={"center"}
      >
        {title}
      </Typography>
    </div>
  );
}

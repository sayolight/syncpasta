import * as React from "react";
import { Typography } from "@/shared/ui";
import styles from "./Loader.module.scss";
import { clsx } from "clsx";

interface LoaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPending: boolean;
  title?: string;
  subtitle?: string;
}

export function Loader({
  isPending,
  title = "loading",
  subtitle,
  // ...props
}: LoaderProps) {
  return (
    isPending && (
      <div className={clsx(styles.loader)}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          width="128"
          height="128"
        >
          <source src={"./loader.webm"} type="video/webm" />
        </video>
        <Typography weight={"bold"}>{title}</Typography>
        {subtitle && <Typography variant={"muted"}>{subtitle}</Typography>}
      </div>
    )
  );
}

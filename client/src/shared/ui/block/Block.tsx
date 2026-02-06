import * as React from "react";
import styles from "./Block.module.scss";
import { clsx } from "clsx";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  direction?: "column" | "row";
  isCard?: boolean;
  title?: string;
}

export function Block({
  direction = "column",
  isCard = true,
  title,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(styles.block, isCard && styles["block--is_card"])}
      {...props}
    >
      {title && <span className={styles.block__title}>{title}</span>}
      <div
        className={clsx(
          styles.block__children,
          direction === "row" && styles["block__children--row"],
          direction === "column" && styles["block__children--column"],
        )}
      >
        {children}
      </div>
    </div>
  );
}

import * as React from "react";
import styles from "./Input.module.scss";
import { clsx } from "clsx";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
}

export function Textarea({ title, ...props }: TextareaProps) {
  return (
    <div
      className={clsx(
        styles.input__container,
        props.disabled && styles["input__container--disabled"],
      )}
    >
      <span className={styles.input__title}>{title}</span>
      <textarea className={clsx(styles.input)} {...props}></textarea>
    </div>
  );
}

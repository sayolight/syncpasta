import * as React from "react";
import styles from "./Input.module.scss";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export function Input({ title, ...props }: InputProps) {
  return (
    <div
      className={clsx(
        styles.input__container,
        props.disabled && styles["input__container--disabled"],
      )}
    >
      <span className={styles.input__title}>{title}</span>
      <input className={clsx(styles.input)} {...props}></input>
    </div>
  );
}

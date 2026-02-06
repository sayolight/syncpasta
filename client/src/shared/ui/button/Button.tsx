import * as React from "react";
import styles from "./Button.module.scss";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning";
}

export function Button({
  variant = "secondary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[variant])}
      {...props}
    >
      {children}
    </button>
  );
}

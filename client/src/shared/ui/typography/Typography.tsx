import * as React from "react";
import { clsx } from "clsx";
import styles from "./Typography.module.scss";

interface TypographyProps extends React.HTMLProps<HTMLElement> {
  type?: "h1" | "h2" | "p" | "span";
  align?: "left" | "center" | "right";
  weight?: "regular" | "medium" | "bold";
  variant?: "normal" | "accent" | "muted" | "disabled";
  size?: number;
}

export function Typography({
  type = "span",
  align = "left",
  weight = "regular",
  variant = "normal",
  size = 14,
  children,
  className,
  ...props
}: TypographyProps) {
  const Tag = type as React.ElementType;

  return (
    <Tag
      {...props}
      align={align}
      className={clsx(
        styles.typography,
        styles[`typography--align-${align}`],
        styles[`typography--weight-${weight}`],
        styles[`typography--variant-${variant}`],
        className,
      )}
      style={{
        fontSize: `${size}px`,
      }}
    >
      {children}
    </Tag>
  );
}

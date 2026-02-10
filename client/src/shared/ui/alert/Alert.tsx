import * as React from "react";
import styles from "./Alert.module.scss";
import { clsx } from "clsx";
import { Block, Typography } from "@/shared/ui";

interface AlertProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  icon?: string;
}

export function Alert({ title, children, ...props }: AlertProps) {
  return (
    <Block className={clsx(styles.alert)} {...props}>
      {title && (
        <Typography weight={"bold"} variant={"accent"}>
          {title}
        </Typography>
      )}
      {children && <Typography>{children}</Typography>}
    </Block>
  );
}

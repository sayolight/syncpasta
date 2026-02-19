import * as React from "react";
import styles from "./Modal.module.scss";
import { clsx } from "clsx";
import { Block } from "@ui/block";

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  active: boolean;
  onClose: () => void;
}

export function Modal({
  title,
  active,
  onClose,
  children,
  ...props
}: ModalProps) {
  return (
    active && (
      <div className={clsx(styles.modal)} {...props}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={clsx(styles.modal__background)} onClick={onClose}></div>
        <Block className={clsx(styles.modal__content)}>
          <div className={clsx(styles.modal__title)}>
            <span>{title}</span>
            <button
              type="button"
              className={clsx(styles.modal__title__close)}
              onClick={onClose}
            >
              ×
            </button>
          </div>
          {children}
        </Block>
      </div>
    )
  );
}

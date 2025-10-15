"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "link" | "primary" | "dangerous";
  element?: "button" | "link";
  textAlign?: "left" | "center" | "right";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: "_blank" | "_self";
  type?: "button" | "submit" | "reset";
}

const DEFAULT_ELEMENT = "button";
export const Button = (props: ButtonProps) => {
  const Element =
    props.element === "link" ? "a" : props.element || DEFAULT_ELEMENT;

  return (
    <motion.div
      className={`bg-surface-base text-${
        props.variant === "dangerous" ? "red-400" : "base"
      } hover:bg-surface-base-hover hover:text-fg-hover cursor-pointer rounded transition py-2 px-3 text-sm w-full font-light text-${
        props.textAlign ?? "left"
      } ${props.className || ""}`}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.05 }}
      onClick={props.onClick}
    >
      <Element href={props.href || "#"} target={props.target} type={props.type}>
        <span className={`flex items-center gap-1 cursor-pointer`}>
          {props.variant === "link" ? <ExternalLink size={18} /> : null}
          {props.children}
        </span>
      </Element>
    </motion.div>
  );
};

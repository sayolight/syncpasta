"use client";
interface TextProps {
  children: React.ReactNode;
  element?: "p" | "span" | "div";
  variant?: "base" | "muted";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
}

const DEFAULT_ELEMENT = "p";
export const Text = (props: TextProps) => {
  const Element = props.element || DEFAULT_ELEMENT;

  if (props.href) {
    return (
      <a
        href={props.href}
        className={`text-${props.size ?? "sm"} text-${
          props.variant ?? "base"
        } font-${props.weight || "normal"} hover:text-muted transition ${props.className || ""}`}
      >
        {props.children}
      </a>
    );
  }

  return (
    <>
      <Element
        className={`text-${props.size ?? "sm"} text-${
          props.variant ?? "base"
        } font-${props.weight || "normal"} ${props.className || ""}`}
      >
        {props.children}
      </Element>
    </>
  );
};

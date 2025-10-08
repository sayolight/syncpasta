import * as React from "react";

interface BlockProps {
  children: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export const Block = (props: BlockProps) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full rounded bg-neutral-800 p-4 ${
        props.transparent ? "bg-transparent" : "bg-neutral-800"
      } ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
};

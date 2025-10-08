import * as React from "react";

interface InputProps {
  title?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-0 w-full">
      <span className="text-sm">{props.title}</span>
      <input
        {...props}
        className={`bg-surface-muted rounded py-2 px-3 w-full outline-none ${
          props.className || ""
        }`}
      />
    </div>
  );
};

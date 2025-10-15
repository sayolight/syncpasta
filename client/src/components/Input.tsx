import * as React from "react";

interface InputProps {
  title?: string;
  type?: "text" | "password" | "email" | "number" | "textarea";
  placeholder?: string;
  className?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-0 w-full bg-surface-muted rounded">
      <span className="text-xs text-muted px-3 pt-2">{props.title}</span>
      {props.type === "textarea" ? (
        <textarea
          {...props}
          className={`pt-1 pb-2 px-3 w-full outline-none ${
            props.className || ""
          }`}
        ></textarea>
      ) : (
        <input
          {...props}
          className={`pt-1 pb-2 px-3 w-full outline-none ${
            props.className || ""
          }`}
        />
      )}
    </div>
  );
};

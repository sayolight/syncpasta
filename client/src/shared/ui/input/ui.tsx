interface InputProps {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={`bg-neutral-800 text-neutral-200 rounded p-2 w-full outline-none ${
        props.className || ""
      }`}
    />
  );
};

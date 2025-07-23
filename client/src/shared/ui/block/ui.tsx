interface BlockProps {
  children: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export const Block = (props: BlockProps) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full rounded-lg bg-neutral-800 p-4 text-sm ${
        props.transparent ? "bg-transparent" : "bg-neutral-900"
      } ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
};

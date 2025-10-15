"use client";
import { Text } from "@/components/Text";
// import { usePathname } from "next/navigation";

export const Header = () => {
  // const pathname = usePathname();

  return (
    <div className="p-3 flex items-center justify-between w-full text-sm font-semibold text-neutral-300">
      <div>
        <Text variant="fg" weight="bold" size="md" element="span" href="/">
          syncpasta
        </Text>
      </div>

      <div className="flex gap-4">
        <Text href="/gallery">gallery</Text>
        <Text href="/account">account</Text>
      </div>
    </div>
  );
};

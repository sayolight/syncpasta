"use client";
import { Text } from "@/components/Text";
import { auth } from "@/lib/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
// import { usePathname } from "next/navigation";

export const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="p-3 flex items-center justify-between w-full text-sm font-semibold text-neutral-300">
      <div>
        <Text variant="fg" weight="bold" size="md" element="span" href="/">
          syncpasta
        </Text>
      </div>

      <div className="flex gap-4">
        <Text href="/gallery">gallery</Text>
        {user && <Text href="/account">account</Text>}
        {!user && <Text href="/auth">login</Text>}
      </div>
    </div>
  );
};

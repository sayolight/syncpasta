import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { PasswordResetButton } from "@/features/auth/password-reset/ui/PasswordResetButton.tsx";
import { useState } from "react";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");

  return (
    <Block title={"reset your password"}>
      <Input
        type={"email"}
        placeholder={"coolguy@mail.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordResetButton email={email} />
    </Block>
  );
}

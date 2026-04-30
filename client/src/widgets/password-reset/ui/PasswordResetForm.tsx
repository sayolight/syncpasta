import { usePasswordReset } from "@/features/auth/password-reset/model/usePasswordReset.ts";
import { useState } from "react";
import { Block } from "@ui/block";
import { Alert } from "@ui/alert";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

export default function PasswordResetForm() {
  const { sendPasswordResetEmail, error, isLoading } = usePasswordReset();
  const [email, setEmail] = useState("");

  return (
    <Block title={"reset your password"}>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      <Input
        type={"email"}
        placeholder={"user@mail.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        onClick={() => sendPasswordResetEmail(email)}
        disabled={isLoading}
      >
        send reset password link
      </Button>
    </Block>
  );
}

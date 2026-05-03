import { usePasswordReset } from "@/features/auth/password-reset/model/usePasswordReset.ts";
import { useState } from "react";
import { Block } from "@ui/block";
import { Alert } from "@ui/alert";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

export default function PasswordResetForm() {
  const { sendPasswordResetEmail, error, success, isLoading } =
    usePasswordReset();
  const [email, setEmail] = useState("");

  return (
    <Block title={"reset your password"}>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      {success && <Alert title={"✔ success!"}>check your email</Alert>}
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

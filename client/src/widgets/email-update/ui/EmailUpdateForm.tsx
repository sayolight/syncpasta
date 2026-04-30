import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEmailUpdate } from "@/features/auth/email-update/model/useEmailUpdate.ts";
import { useState } from "react";
import { Alert } from "@ui/alert";

export default function EmailUpdateForm() {
  const { emailUpdate, isLoading, error } = useEmailUpdate();
  const [email, setEmail] = useState("");

  return (
    <>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      <Input
        type={"email"}
        placeholder={"newmail@mail.com"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => emailUpdate(email)} disabled={isLoading}>
        change email
      </Button>
    </>
  );
}

import { Button } from "@ui/button";
import { usePasswordReset } from "@/features/auth/password-reset/model/usePasswordReset.ts";

interface PasswordResetButtonProps {
  email: string;
}

export function PasswordResetButton({ email }: PasswordResetButtonProps) {
  const { sendPasswordResetEmail, isLoading } = usePasswordReset();

  return (
    <>
      <Button
        onClick={() => sendPasswordResetEmail(email)}
        disabled={isLoading}
      >
        send reset password link
      </Button>
    </>
  );
}

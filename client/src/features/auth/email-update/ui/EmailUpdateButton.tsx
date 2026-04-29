import { Button } from "@ui/button";
import { useEmailUpdate } from "@/features/auth/email-update/model/useEmailUpdate.ts";

interface EmailUpdateButtonProps {
  email: string;
}

export function EmailUpdateButton({ email }: EmailUpdateButtonProps) {
  const { emailUpdate, isLoading } = useEmailUpdate();

  return (
    <>
      <Button onClick={() => emailUpdate(email)} disabled={isLoading}>
        change email
      </Button>
    </>
  );
}

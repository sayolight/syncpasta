import { useSignOut } from "@/features/auth/sign-out/model/useSignOut.ts";
import { Button } from "@ui/button";

export function SignOutButton() {
  const { signOut, isLoading } = useSignOut();

  return (
    <Button onClick={signOut} disabled={isLoading}>
      sign out
    </Button>
  );
}

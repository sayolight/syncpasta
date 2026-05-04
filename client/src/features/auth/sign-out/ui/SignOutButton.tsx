import { useSignOut } from "@/features/auth/sign-out/model/useSignOut.ts";
import { Button } from "@ui/button";
import { useTranslation } from "react-i18next";

export function SignOutButton() {
  const { t } = useTranslation();
  const { signOut, isLoading } = useSignOut();

  return (
    <Button onClick={signOut} disabled={isLoading}>
      {t("auth.sign.out.title")}
    </Button>
  );
}

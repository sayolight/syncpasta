import { usePasswordReset } from "@/features/auth/password-reset/model/usePasswordReset.ts";
import { useState } from "react";
import { Block } from "@ui/block";
import { Alert } from "@ui/alert";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useTranslation } from "react-i18next";

export default function PasswordResetForm() {
  const { t } = useTranslation();
  const { sendPasswordResetEmail, error, success, isLoading } =
    usePasswordReset();
  const [email, setEmail] = useState("");

  return (
    <Block title={t("account.password.update.title")}>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      {success && (
        <Alert title={"✔ success!"}>{t("account.email.update.success")}</Alert>
      )}
      <Input
        title={t("auth.sign.email.title")}
        type={"email"}
        placeholder={t("auth.sign.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        onClick={() => sendPasswordResetEmail(email)}
        disabled={isLoading}
      >
        {t("account.password.update.send_link")}
      </Button>
    </Block>
  );
}

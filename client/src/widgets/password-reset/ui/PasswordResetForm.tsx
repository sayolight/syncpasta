import { usePasswordReset } from "@/features/auth/password-reset/model/usePasswordReset.ts";
import { useState } from "react";
import { Block } from "@ui/block";
import { Alert } from "@ui/alert";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

export default function PasswordResetForm() {
  const { t } = useTranslation();
  const { isPending, error, isSuccess, mutate } = usePasswordReset();
  const [email, setEmail] = useState("");

  return (
    <Block title={t("account.password.update.title")}>
      <ErrorAlert error={error} />

      {isSuccess && (
        <Alert title={"✔ success!"}>{t("account.email.update.success")}</Alert>
      )}
      <Input
        title={t("auth.sign.email.title")}
        type={"email"}
        placeholder={t("auth.sign.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => mutate(email)} disabled={isPending}>
        {t("account.password.update.send_link")}
      </Button>
    </Block>
  );
}

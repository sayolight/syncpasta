import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEmailUpdate } from "@/features/auth/email-update/model/useEmailUpdate.ts";
import { useState } from "react";
import { Alert } from "@ui/alert";
import { useTranslation } from "react-i18next";

export default function EmailUpdateForm() {
  const { t } = useTranslation();
  const { emailUpdate, isLoading, error, success } = useEmailUpdate();
  const [email, setEmail] = useState("");

  return (
    <>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      {success && (
        <Alert title={"✔ success!"}>{t("account.email.update.success")}</Alert>
      )}
      <Input
        type={t("auth.sign.email.title")}
        placeholder={t("auth.sign.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => emailUpdate(email)} disabled={isLoading}>
        {t("account.email.update.title")}
      </Button>
    </>
  );
}

import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEmailUpdate } from "@/features/auth/email-update/model/useEmailUpdate.ts";
import { useState } from "react";
import { Alert } from "@ui/alert";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

export default function EmailUpdateForm() {
  const { t } = useTranslation();
  const { isPending, error, isSuccess, mutate } = useEmailUpdate();
  const [email, setEmail] = useState("");

  return (
    <>
      <ErrorAlert error={error} />
      {isSuccess && (
        <Alert title={"✔ success!"}>{t("account.email.update.success")}</Alert>
      )}
      <Input
        type={t("auth.sign.email.title")}
        placeholder={t("auth.sign.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => mutate(email)} disabled={isPending}>
        {t("account.email.update.title")}
      </Button>
    </>
  );
}

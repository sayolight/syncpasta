import { Link } from "react-router";
import { Button } from "@ui/button";
import { useTranslation } from "react-i18next";

export default function PasswordResetButton() {
  const { t } = useTranslation();
  return (
    <Link to={{ pathname: "/account/password-reset" }}>
      <Button>{t("account.password.update.title")}</Button>
    </Link>
  );
}

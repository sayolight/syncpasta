import { Block } from "@ui/block";
import PasswordResetButton from "@/widgets/password-reset/ui/PaswordResetButton.tsx";
import EmailUpdateForm from "@/widgets/email-update/ui/EmailUpdateForm.tsx";
import { SignOutButton } from "@/features/auth/sign-out/ui/SignOutButton.tsx";
import { useTranslation } from "react-i18next";
import { LocaleChangeList } from "@/features/locale-change/ui/LocaleChangeList.tsx";

export default function AccountPage() {
  const { t } = useTranslation();
  return (
    <Block isCard={false}>
      <Block title={t("lang.title")}>
        <LocaleChangeList />
      </Block>
      <Block title={t("account.email.update.title")}>
        <EmailUpdateForm />
      </Block>
      <Block title={t("account.password.update.title")}>
        <PasswordResetButton />
      </Block>
      <SignOutButton />
    </Block>
  );
}

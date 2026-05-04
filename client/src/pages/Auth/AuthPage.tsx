import { SignInForm, SignUpForm } from "@/features/auth";
import { Block } from "@ui/block";
import { Typography } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { t } = useTranslation();

  return (
    <Block isCard={false}>
      <SignInForm />
      <Typography variant={"muted"} align={"center"} weight={"bold"}>
        {t("auth.sign.or")}
      </Typography>
      <SignUpForm />
    </Block>
  );
}

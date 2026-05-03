import { Block } from "@ui/block";
import { Typography } from "@/shared/ui";
import PasswordResetButton from "@/widgets/password-reset/ui/PaswordResetButton.tsx";
import EmailUpdateForm from "@/widgets/email-update/ui/EmailUpdateForm.tsx";
import { SignOutButton } from "@/features/auth/sign-out/ui/SignOutButton.tsx";

export default function AccountPage() {
  return (
    <Block isCard={false}>
      <Block title="account info">
        <Typography>hi, user!</Typography>
        <Typography variant={"muted"}>you have totally 361 pastas</Typography>
      </Block>
      <Block title="change email">
        <EmailUpdateForm />
      </Block>
      <Block title="change password">
        <PasswordResetButton />
      </Block>
      <SignOutButton />
    </Block>
  );
}

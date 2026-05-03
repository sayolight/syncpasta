import { Block } from "@ui/block";
import PasswordResetButton from "@/widgets/password-reset/ui/PaswordResetButton.tsx";
import EmailUpdateForm from "@/widgets/email-update/ui/EmailUpdateForm.tsx";
import { SignOutButton } from "@/features/auth/sign-out/ui/SignOutButton.tsx";

export default function AccountPage() {
  return (
    <Block isCard={false}>
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

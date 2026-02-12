import { SignInForm, SignUpForm } from "@/features/auth";
import { Block } from "@ui/block";
import { Typography } from "@/shared/ui";

export default function AuthPage() {
  return (
    <Block isCard={false}>
      <SignInForm />
      <Typography variant={"muted"} align={"center"} weight={"bold"}>
        = or =
      </Typography>
      <SignUpForm />
    </Block>
  );
}

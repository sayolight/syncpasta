import { LoginForm, RegisterForm } from "@/features/auth";
import { Block } from "@ui/block";
import { Typography } from "@/shared/ui";

export default function AuthPage() {
  return (
    <Block isCard={false}>
      <LoginForm />
      <Typography variant={"muted"} align={"center"} weight={"bold"}>
        = or =
      </Typography>
      <RegisterForm />
    </Block>
  );
}

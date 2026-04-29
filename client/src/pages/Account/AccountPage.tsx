import { Block } from "@ui/block";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Typography } from "@/shared/ui";
import { Link } from "react-router";
import { useState } from "react";
import { EmailUpdateButton } from "@/features/auth/email-update/ui/EmailUpdateButton.tsx";

export default function AccountPage() {
  const [email, setEmail] = useState("");

  return (
    <Block isCard={false}>
      <Block title="account info">
        <Typography>hi, user!</Typography>
        <Typography variant={"muted"}>you have totally 361 pastas</Typography>
      </Block>
      <Block title="change email">
        <Input
          type={"email"}
          placeholder={"newmail@mail.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <EmailUpdateButton email={email} />
      </Block>
      <Block title="change password">
        <Link to={{ pathname: "/account/password-reset" }}>
          <Button>reset password</Button>
        </Link>
      </Block>
      <Button>logout</Button>
    </Block>
  );
}

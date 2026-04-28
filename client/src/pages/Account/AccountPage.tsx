import { Block } from "@ui/block";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Typography } from "@/shared/ui";
import { Link } from "react-router";

export default function AccountPage() {
  return (
    <Block isCard={false}>
      <Block title="account info">
        <Typography>hi, user!</Typography>
        <Typography variant={"muted"}>you have totally 361 pastas</Typography>
      </Block>
      <Block title="change email">
        <Input title="old email" type="email" placeholder={"old@mail.com"} />
        <Input title="new email" type="email" placeholder={"new@mail.com"} />
        <Button>update</Button>
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

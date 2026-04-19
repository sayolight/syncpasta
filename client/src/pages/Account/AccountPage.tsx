import { Block } from "@ui/block";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Typography } from "@/shared/ui";

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
        <Input title="old password" type="password" placeholder={"*********"} />
        <Input title="new password" type="password" placeholder={"*********"} />
        <Input
          title="repeat new password"
          type="password"
          placeholder={"*********"}
        />
        <Button>update</Button>
      </Block>
      <Button>logout</Button>
    </Block>
  );
}

import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

export function RegisterForm() {
  return (
    <>
      <form action="">
        <Block title={"Register"}>
          <Input
            title={"email"}
            type={"email"}
            placeholder={"user@mail.com"}
          ></Input>
          <Input
            title={"password"}
            type={"password"}
            placeholder={"*************"}
          ></Input>
          <Input
            title={"confirm password"}
            type={"password"}
            placeholder={"*************"}
          ></Input>
          <Button type="submit">register</Button>
        </Block>
      </form>
    </>
  );
}

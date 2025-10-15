import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";

export default function Auth() {
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <Block>
        <Text weight="bold">Login</Text>
        <Input title="Email" type="email" placeholder="user@email.com" />
        <Input title="Password" type="password" placeholder="********" />
        <Button className="w-full mt-2" variant="primary">
          Login
        </Button>
      </Block>
      <Text variant="muted" className="text-center">
        - or -
      </Text>
      <Block>
        <Text weight="bold">Register</Text>
        <Input title="Email" type="email" placeholder="user@email.com" />
        <Input title="Password" type="password" placeholder="********" />
        <Input
          title="Confirm Password"
          type="password"
          placeholder="********"
        />
        <Button className="w-full mt-2" variant="primary">
          Register
        </Button>
      </Block>
    </div>
  );
}

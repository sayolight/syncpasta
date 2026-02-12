import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useSignIn } from "@/features/auth/model/useSignIn.ts";
import { useState } from "react";
import * as React from "react";
import { Alert } from "@/shared/ui";

export function SignInForm() {
  const { signIn, isLoading, error } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ email, password });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Block title="sign in">
          {error && <Alert title={"⚠ error!"}>{error}</Alert>}
          <Input
            title={"email"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"user@mail.com"}
          ></Input>
          <Input
            title={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"*************"}
          ></Input>
          <Button disabled={isLoading} type="submit">
            sign in
          </Button>
        </Block>
      </form>
    </>
  );
}

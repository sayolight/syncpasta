import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useState } from "react";
import { useSignUp } from "@/features/auth/model/useSignUp.ts";
import * as React from "react";
import { Alert } from "@ui/alert";

export function SignUpForm() {
  const { signUp, isLoading, error } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ email, password });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Block title={"sign up"}>
          {error && <Alert title={"⚠ error!"}>{error}</Alert>}
          <Input
            title={"email"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"user@mail.com"}
            disabled={isLoading}
          ></Input>
          <Input
            title={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"*************"}
            disabled={isLoading}
          ></Input>
          <Input
            title={"confirm password"}
            type={"password"}
            placeholder={"*************"}
            disabled={isLoading}
          ></Input>
          <Button disabled={isLoading} type="submit">
            sign up
          </Button>
        </Block>
      </form>
    </>
  );
}

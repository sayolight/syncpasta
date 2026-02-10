import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useLogin } from "@/features/auth/model/useLogin.ts";
import { useState } from "react";
import * as React from "react";
import { Alert } from "@/shared/ui";

export function LoginForm() {
  const { login, isLoading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Block title="Login">
          {error && <Alert title={"⚠ Error!"}>{error}</Alert>}
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
            login
          </Button>
        </Block>
      </form>
    </>
  );
}

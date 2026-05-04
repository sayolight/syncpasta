import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useSignIn } from "@/features/auth/sign-in/model/useSignIn.ts";
import { useState } from "react";
import * as React from "react";
import { Alert } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export function SignInForm() {
  const { t } = useTranslation();
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
        <Block title={t("auth.sign.in.title")}>
          {error && <Alert title={"⚠ error!"}>{error}</Alert>}
          <Input
            title={t("auth.sign.email.title")}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.sign.email.placeholder")}
          ></Input>
          <Input
            title={t("auth.sign.password.title")}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("auth.sign.password.placeholder")}
          ></Input>
          <Button disabled={isLoading} type="submit">
            {t("auth.sign.in.title")}
          </Button>
        </Block>
      </form>
    </>
  );
}

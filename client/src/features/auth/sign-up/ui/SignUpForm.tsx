import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useState } from "react";
import { useSignUp } from "@/features/auth/sign-up/model/useSignUp.ts";
import * as React from "react";
import { Alert } from "@ui/alert";
import { useTranslation } from "react-i18next";

export function SignUpForm() {
  const { t } = useTranslation();
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
        <Block title={t("auth.sign.up.title")}>
          {error && <Alert title={"⚠ error!"}>{error}</Alert>}
          <Input
            title={t("auth.sign.email.title")}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.sign.email.placeholder")}
            disabled={isLoading}
          ></Input>
          <Input
            title={t("auth.sign.password.title")}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("auth.sign.password.placeholder")}
            disabled={isLoading}
          ></Input>
          <Input
            title={t("auth.sign.password.confirm")}
            type={"password"}
            placeholder={t("auth.sign.password.placeholder")}
            disabled={isLoading}
          ></Input>
          <Button disabled={isLoading} type="submit">
            {t("auth.sign.up.title")}
          </Button>
        </Block>
      </form>
    </>
  );
}

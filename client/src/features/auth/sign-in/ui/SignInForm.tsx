import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useSignIn } from "@/features/auth/sign-in/model/useSignIn.ts";
import { useState } from "react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

export function SignInForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, isPending, mutate } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: async () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Block title={t("auth.sign.in.title")}>
          <ErrorAlert error={error} />
          <Input
            title={t("auth.sign.email.title")}
            type={"email"}
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.sign.email.placeholder")}
          ></Input>
          <Input
            title={t("auth.sign.password.title")}
            type={"password"}
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("auth.sign.password.placeholder")}
          ></Input>
          <Button disabled={isPending} type="submit">
            {t("auth.sign.in.title")}
          </Button>
        </Block>
      </form>
    </>
  );
}

import { Block } from "@ui/block";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useState } from "react";
import { useSignUp } from "@/features/auth/sign-up/model/useSignUp.ts";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

export function SignUpForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, isPending, mutate } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password, confirmPassword },
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
        <Block title={t("auth.sign.up.title")}>
          <ErrorAlert error={error} />
          <Input
            title={t("auth.sign.email.title")}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.sign.email.placeholder")}
            disabled={isPending}
          ></Input>
          <Input
            title={t("auth.sign.password.title")}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("auth.sign.password.placeholder")}
            disabled={isPending}
          ></Input>
          <Input
            title={t("auth.sign.password.confirm")}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("auth.sign.password.placeholder")}
            disabled={isPending}
          ></Input>
          <Button disabled={isPending} type="submit">
            {t("auth.sign.up.title")}
          </Button>
        </Block>
      </form>
    </>
  );
}

import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useTranslation } from "react-i18next";
import { useResetApplication } from "@/entities/application/api/useResetApplication.ts";

interface ResetApiKeyButtonProps {
  application: Application;
}

export function ResetApiKeyButton({ application }: ResetApiKeyButtonProps) {
  const { t } = useTranslation();
  const { isPending, mutate } = useResetApplication();

  return (
    <Button
      variant={"primary"}
      disabled={isPending}
      onClick={() => mutate({ id: application.id })}
    >
      {t("application.key.reset")}
    </Button>
  );
}

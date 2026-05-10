import type { Application } from "@/entities/application";
import { Button } from "@ui/button";
import { useTranslation } from "react-i18next";
import { useRemoveApplication } from "@/entities/application/api/useRemoveApplication.ts";

interface RemoveApiKeyButtonProps {
  application: Application;
}

export function RemoveApiKeyButton({ application }: RemoveApiKeyButtonProps) {
  const { t } = useTranslation();
  const { isPending, mutate } = useRemoveApplication();

  return (
    <Button
      variant={"warning"}
      disabled={isPending}
      onClick={() => mutate({ id: application.id })}
    >
      {t("application.key.remove")}
    </Button>
  );
}

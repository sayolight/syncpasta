import type { Application } from "@/entities/application";
import { Button } from "@ui/button";
import { useRemoveApiKey } from "@/features/application/remove-api-key/model/useRemoveApiKey.ts";
import { useApplicationStore } from "@/entities/application/model/store.ts";
import { useTranslation } from "react-i18next";

interface RemoveApiKeyButtonProps {
  application: Application;
}

export function RemoveApiKeyButton({ application }: RemoveApiKeyButtonProps) {
  const { t } = useTranslation();
  const { remove } = useApplicationStore();
  const { removeApiKey, isLoading } = useRemoveApiKey();

  return (
    <Button
      variant={"warning"}
      disabled={isLoading}
      onClick={() =>
        removeApiKey({ id: application.id }).then(() => remove(application.id))
      }
    >
      {t("application.key.remove")}
    </Button>
  );
}

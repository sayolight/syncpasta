import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useCopyApiKey } from "@/features/application/copy-api-key/model/useCopyApiKey.ts";
import { useTranslation } from "react-i18next";

interface CopyApiKeyButtonProps {
  application: Application;
}

export function CopyApiKeyButton({ application }: CopyApiKeyButtonProps) {
  const { t } = useTranslation();
  const { copyApiKey } = useCopyApiKey();

  return (
    <Button
      disabled={!application.key}
      onClick={() => copyApiKey(application.key)}
    >
      {t("application.key.copy")}
    </Button>
  );
}

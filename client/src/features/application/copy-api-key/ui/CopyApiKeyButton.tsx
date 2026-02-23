import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useCopyApiKey } from "@/features/application/copy-api-key/model/useCopyApiKey.ts";

interface CopyApiKeyButtonProps {
  application: Application;
}

export function CopyApiKeyButton({ application }: CopyApiKeyButtonProps) {
  const { copyApiKey } = useCopyApiKey();

  return (
    <Button
      disabled={!application.key}
      onClick={() => copyApiKey(application.key)}
    >
      copy
    </Button>
  );
}

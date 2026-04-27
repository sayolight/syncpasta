import { Block } from "@ui/block";
import { Input } from "@ui/input";
import type { Application } from "@/entities/application";
import { CopyApiKeyButton } from "@/features/application/copy-api-key";
import { ResetApiKeyButton } from "@/features/application/reset-api-key";
import { RemoveApiKeyButton } from "@/features/application/remove-api-key";
import { ViewApplicationLogsButton } from "@/features/application/view-logs/ui/ViewApplicationLogsButton.tsx";
import { ViewApplicationLogsModal } from "@/features/application/view-logs/ui/ViewApplicationLogsModal.tsx";
import { useState } from "react";

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const [viewLogsModal, setViewLogsModal] = useState(false);
  return (
    <Block title={application.name} key={application.id}>
      <Block direction={"column"} isCard={false}>
        <Input
          disabled={!application.key}
          title={"API_KEY"}
          value={
            application.key ||
            "the token can only be obtained upon creation. reset it to obtain a new one."
          }
        ></Input>
      </Block>
      <Block direction={"row"} isCard={false}>
        <CopyApiKeyButton application={application} />
        <ResetApiKeyButton application={application} />
        <RemoveApiKeyButton application={application} />
        <ViewApplicationLogsButton
          application={application}
          setViewLogsModal={setViewLogsModal}
        />
        <ViewApplicationLogsModal
          application={application}
          isOpen={viewLogsModal}
          setIsOpen={setViewLogsModal}
        />
      </Block>
    </Block>
  );
}

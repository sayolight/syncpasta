import { Modal } from "@ui/modal";
import { useViewApplicationLogs } from "@/features/application/view-logs/model/useViewApplicationLogs.ts";
import type { Application } from "@/entities/application";
import { Timeline } from "@ui/timeline";
import { Input } from "@ui/input";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";

interface ViewApplicationLogsModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  application: Application;
}

export function ViewApplicationLogsModal({
  isOpen,
  setIsOpen,
  application,
}: ViewApplicationLogsModalProps) {
  const { t } = useTranslation();
  const { error, isPending, data } = useViewApplicationLogs(application.id);

  return (
    <Modal
      title={t("application.logs.title")}
      active={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ErrorAlert error={error} />
      {isPending && "loading..."}
      {data && (
        <Timeline
          timeline={data.map((log) => ({
            date: new Date(log.createdAt),
            content: (
              <>
                {log.type}
                <Input value={JSON.stringify(log.meta)}></Input>
              </>
            ),
          }))}
        ></Timeline>
      )}
    </Modal>
  );
}

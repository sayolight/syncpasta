import { Modal } from "@ui/modal";
import { Alert } from "@ui/alert";
import { useEffect } from "react";
import { useViewApplicationLogs } from "@/features/application/view-logs/model/useViewApplicationLogs.ts";
import type { Application } from "@/entities/application";
import { Timeline } from "@ui/timeline";
import { Input } from "@ui/input";

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
  const { viewLogs, isLoading, error } = useViewApplicationLogs();

  useEffect(() => {
    viewLogs(application.id).then();
  }, []);

  return (
    <Modal title={"view logs"} active={isOpen} onClose={() => setIsOpen(false)}>
      {error && <Alert title={"⚠ error!"}>{error}</Alert>}
      {isLoading ?? "loading..."}
      <Timeline
        timeline={application.logs?.map((log) => ({
          date: new Date(log.createdAt),
          content: (
            <>
              {log.type}
              <Input value={JSON.stringify(log.meta)}></Input>
            </>
          ),
        }))}
      ></Timeline>
    </Modal>
  );
}

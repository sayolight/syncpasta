import { Modal } from "@ui/modal";
import { useViewApplicationLogs } from "@/features/application/view-logs/model/useViewApplicationLogs.ts";
import type { Application } from "@/entities/application";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "@/widgets/error-alert/ui/ErrorAlert.tsx";
import { Block, Input, Typography } from "@/shared/ui";
import { Timeline } from "@ui/timeline";

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
            action: t("application.logs." + log.type),
            content: (
              <>
                <Block isCard={false}>
                  <Typography weight={"bold"} variant={"muted"}></Typography>
                  {log.type === "pasta_query" && (
                    <>
                      <Input
                        title={t("pasta.search.input.title")}
                        value={log.meta.query}
                        disabled={true}
                      ></Input>
                      <Typography>
                        {t("application.logs.result_count")}:{" "}
                        <b>{log.meta.results_count}</b>
                      </Typography>
                    </>
                  )}
                  {log.type === "pasta_create" && (
                    <Typography>
                      {t("pasta.create.keywords.title")}:{" "}
                      <b>{log.meta.keywords}</b>
                    </Typography>
                  )}
                  {log.type === "pasta_update" && (
                    <>
                      <Typography>
                        ID: <b>{log.meta.id}</b>
                      </Typography>
                      <Typography>
                        {t("pasta.create.keywords.title")}:{" "}
                        <b>{log.meta.keywords}</b>
                      </Typography>
                      <Typography>
                        {t("pasta.edit.text")}: <b>{log.meta.text}</b>
                      </Typography>
                    </>
                  )}
                  {log.type === "pasta_delete" && (
                    <Typography>
                      ID: <b>{log.meta.id}</b>
                    </Typography>
                  )}
                </Block>
              </>
            ),
          }))}
        ></Timeline>
      )}
    </Modal>
  );
}

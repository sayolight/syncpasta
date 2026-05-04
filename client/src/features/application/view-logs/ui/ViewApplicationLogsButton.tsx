import { Button } from "@ui/button";
import type { Application } from "@/entities/application";
import { useTranslation } from "react-i18next";

interface ViewApplicationLogsButtonProps {
  application: Application;
  setViewLogsModal: (isOpen: boolean) => void;
}

export function ViewApplicationLogsButton({
  setViewLogsModal,
}: ViewApplicationLogsButtonProps) {
  const { t } = useTranslation();
  return (
    <Button onClick={() => setViewLogsModal(true)}>
      {t("application.logs.button")}
    </Button>
  );
}

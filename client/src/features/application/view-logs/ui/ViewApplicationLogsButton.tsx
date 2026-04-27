import { Button } from "@ui/button";
import type { Application } from "@/entities/application";

interface ViewApplicationLogsButtonProps {
  application: Application;
  setViewLogsModal: (isOpen: boolean) => void;
}

export function ViewApplicationLogsButton({
  setViewLogsModal,
}: ViewApplicationLogsButtonProps) {
  return <Button onClick={() => setViewLogsModal(true)}>view logs</Button>;
}

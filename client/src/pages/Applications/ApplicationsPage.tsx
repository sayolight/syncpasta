import { Block } from "@ui/block";
import { Button } from "@/shared/ui";
import { useState } from "react";
import { ApplicationCard } from "@/widgets/application-card/ui/ApplicationCard.tsx";
import { type Application, useApplications } from "@/entities/application";
import { CreateApplicationForm } from "@/features/application/create/ui/CreateApplicationForm.tsx";
import { useTranslation } from "react-i18next";
import { Loader } from "@ui/loader";

export default function ApplicationsPage() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, data } = useApplications();

  return (
    <>
      <Block isCard={false}>
        <Button variant={"primary"} onClick={() => setIsOpen(true)}>
          {t("application.create.button")}
        </Button>

        <Loader isPending={isPending} />
        {data?.map((application: Application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          ></ApplicationCard>
        ))}
      </Block>
      <CreateApplicationForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

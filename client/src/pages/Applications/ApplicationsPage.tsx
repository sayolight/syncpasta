import { Block } from "@ui/block";
import { Button } from "@/shared/ui";
import { useEffect, useState } from "react";
import { ApplicationCard } from "@/widgets/application-card/ui/ApplicationCard.tsx";
import type { Application } from "@/entities/application";
import { CreateApplicationForm } from "@/features/application/create/ui/CreateApplicationForm.tsx";
import { useApplicationStore } from "@/entities/application/model/store.ts";

export default function ApplicationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { applications, fetch } = useApplicationStore();

  useEffect(() => {
    fetch().then();
  }, []);

  return (
    <>
      <Block isCard={false}>
        <Button variant={"primary"} onClick={() => setIsOpen(true)}>
          + create a new application
        </Button>

        {applications.map((application: Application) => (
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

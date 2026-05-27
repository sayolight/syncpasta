import { type Pasta, PastaCard } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";
import { EditPastaForm } from "@/features/pasta";
import { useState } from "react";
import { usePastas } from "@/entities/pasta/api/usePastas.ts";
import { Loader } from "@ui/loader";
import { Illustration } from "@ui/illustration";
import { useTranslation } from "react-i18next";

interface PastaBoardProps {
  query: string;
}

export default function PastaBoard({ query }: PastaBoardProps) {
  const { t } = useTranslation();
  const { isPending, data } = usePastas(query);
  const [editModal, setEditModal] = useState(false);
  const [currentPasta, setCurrentPasta] = useState<Pasta>();

  const openEditModal = (pasta: Pasta) => {
    setCurrentPasta(pasta);
    setEditModal(true);
  };

  return (
    <>
      <Loader isPending={isPending} />
      {data?.length === 0 && !isPending && (
        <Illustration image={"empty"} title={t("pasta.gallery.empty")} />
      )}
      <div className={styles.pasta_board}>
        {currentPasta && (
          <EditPastaForm
            key={currentPasta.id}
            pasta={currentPasta}
            isOpen={editModal}
            setIsOpen={setEditModal}
          />
        )}
        {data?.map((pasta) => (
          <PastaCard
            onClick={() => openEditModal(pasta)}
            pasta={pasta}
            key={pasta.id}
          />
        ))}
      </div>
    </>
  );
}

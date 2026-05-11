import { type Pasta, PastaCard } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";
import { EditPastaForm } from "@/features/pasta";
import { useState } from "react";
import { usePastas } from "@/entities/pasta/api/usePastas.ts";

export default function PastaBoard() {
  const { data } = usePastas();
  const [editModal, setEditModal] = useState(false);
  const [currentPasta, setCurrentPasta] = useState<Pasta>();

  const openEditModal = (pasta: Pasta) => {
    setCurrentPasta(pasta);
    setEditModal(true);
  };

  return (
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
  );
}

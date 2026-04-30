import { type Pasta, PastaCard, usePastaStore } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";
import { EditPastaForm } from "@/features/pasta";
import { useEffect, useState } from "react";
import { usePastaSearch } from "@/features/pasta/search/model/usePastaSearch.ts";

export default function PastaBoard() {
  const { pastas } = usePastaStore();
  const { pastaSearch } = usePastaSearch();
  const [editModal, setEditModal] = useState(false);
  const [currentPasta, setCurrentPasta] = useState<Pasta>();

  const openEditModal = (pasta: Pasta) => {
    setEditModal(true);
    setCurrentPasta(pasta);
  };

  useEffect(() => {
    pastaSearch().then();
  }, []);

  return (
    <div className={styles.pasta_board}>
      {currentPasta && (
        <EditPastaForm
          pasta={currentPasta}
          isOpen={editModal}
          setIsOpen={setEditModal}
        />
      )}
      {pastas.map((pasta) => (
        <PastaCard
          onClick={() => openEditModal(pasta)}
          pasta={pasta}
          key={pasta.id}
        />
      ))}
    </div>
  );
}

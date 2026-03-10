import { type Pasta, PastaCard } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";
import { EditPastaForm } from "@/features/pasta";
import { useState } from "react";

interface PastaBoardProps {
  pasta: Pasta[];
  onUpdate: () => void;
}

export default function PastaBoard({ pasta, onUpdate }: PastaBoardProps) {
  const [editModal, setEditModal] = useState(false);
  const [currentPasta, setCurrentPasta] = useState<Pasta>();

  const openEditModal = (pasta: Pasta) => {
    setEditModal(true);
    setCurrentPasta(pasta);
  };

  return (
    <div className={styles.pasta_board}>
      {currentPasta && (
        <EditPastaForm
          pasta={currentPasta}
          onUpdate={onUpdate}
          isOpen={editModal}
          setIsOpen={setEditModal}
        />
      )}
      {pasta.map((p) => (
        <PastaCard onClick={() => openEditModal(p)} pasta={p} key={p.id} />
      ))}
    </div>
  );
}

import { type Pasta, PastaCard } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";

export default function PastaBoard({ pasta }: { pasta: Pasta[] }) {
  return (
    <div className={styles.pasta_board}>
      {pasta.map((p) => (
        <PastaCard pasta={p} key={p.id} />
      ))}
    </div>
  );
}

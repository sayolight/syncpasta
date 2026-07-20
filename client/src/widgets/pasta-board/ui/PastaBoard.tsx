import { type Pasta, PastaCard } from "@/entities/pasta";
import styles from "./PastaBoard.module.scss";
import { EditPastaForm } from "@/features/pasta";
import { useState } from "react";
import { usePastas } from "@/entities/pasta/api/usePastas.ts";
import { Loader } from "@ui/loader";
import { Illustration } from "@ui/illustration";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

interface PastaBoardProps {
  query: string;
}

export default function PastaBoard({ query }: PastaBoardProps) {
  const { t } = useTranslation();
  const { isPending, isFetchingNextPage, hasNextPage, fetchNextPage, data } =
    usePastas(query);
  const [editModal, setEditModal] = useState(false);
  const [currentPasta, setCurrentPasta] = useState<Pasta>();

  const pastas = data?.pages.flatMap((page) => page.items) ?? [];

  const openEditModal = (pasta: Pasta) => {
    setCurrentPasta(pasta);
    setEditModal(true);
  };
  return (
    <>
      {pastas?.length === 0 && !isPending && (
        <Illustration image={"empty"} title={t("pasta.gallery.empty")} />
      )}
      {currentPasta && (
        <EditPastaForm
          key={currentPasta.id}
          pasta={currentPasta}
          isOpen={editModal}
          setIsOpen={setEditModal}
        />
      )}

      <InfiniteScroll
        dataLength={pastas.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loader isPending={isFetchingNextPage} />}
      >
        <div className={styles.pasta_board}>
          {pastas.map((pasta) => (
            <PastaCard
              onClick={() => openEditModal(pasta)}
              pasta={pasta}
              key={pasta.id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

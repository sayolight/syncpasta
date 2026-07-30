import { type Pasta, PastaCard } from "@/entities/pasta";
import { EditPastaForm } from "@/features/pasta";
import { useState } from "react";
import { usePastas } from "@/entities/pasta/api/usePastas.ts";
import { Loader } from "@ui/loader";
import { Illustration } from "@ui/illustration";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            0: 1,
            500: 2,
            700: 3,
            900: 4,
          }}
        >
          <Masonry>
            {pastas.map((pasta) => (
              <PastaCard
                onClick={() => openEditModal(pasta)}
                pasta={pasta}
                key={pasta.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </>
  );
}

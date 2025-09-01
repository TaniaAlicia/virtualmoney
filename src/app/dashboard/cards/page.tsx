"use client";

import MobileCrumb from "@/components/generals/MobileCrumb";
import AddCardBanner from "@/components/cards/AddCardBanner";
import UserCards from "@/components/cards/UserCards";
import type { CardType } from "@/types/card";
import { useCards } from "@/hooks/useCards";

type Props = {
  cardsList: CardType[];
  onDelete?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null;
};


export default function CardsPage({ cardsList, onDelete, deletingId }: Props) {
  const { loading, error, cards, deletingId: deletingCardId, removeCard } = useCards(); // autoLoad = true

  return (
    <main className="max-w-8xl bg-gray1 mx-auto flex-1 space-y-5 px-6 pb-6 pt-0 text-dark">
      <MobileCrumb />

      <div className="w-full flex flex-col gap-5">
        <AddCardBanner />

        {loading && <div className="text-dark2">Cargando tarjetas…</div>}
        {!loading && error && (
          <div className="text-red-600">Error: {error}</div>
        )}

        {!loading && (
          <UserCards
            cardsList={cards}
            onDelete={removeCard}
            deletingId={deletingId}
          />
        )}
      </div>
    </main>
  );
}



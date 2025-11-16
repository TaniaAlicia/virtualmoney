"use client";

import MobileCrumb from "@/components/generals/MobileCrumb";
import AddCardBanner from "@/components/cards/AddCardBanner";
import UserCards from "@/components/cards/UserCards";
import { useCards } from "@/hooks/useCards";

export default function CardsPage() {
  const {
    loading,
    error,
    cards,
    deletingId: deletingCardId,
    removeCard,
  } = useCards(); 
  const LIMIT = 10;
  const atLimit = (cards?.length ?? 0) >= LIMIT;

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-5 bg-gray1 px-6 pb-6 pt-0 text-dark">
      <MobileCrumb />

      <div className="flex w-full flex-col gap-5">
        {!atLimit && <AddCardBanner />}

        {loading && <div className="text-dark2">Cargando tarjetas…</div>}
        {!loading && error && (
          <div className="text-red-600">Error: {error}</div>
        )}

        {!loading && (
          <UserCards
            cardsList={cards}
            onDelete={removeCard}
            deletingId={deletingCardId}
          />
        )}
      </div>
    </main>
  );
}

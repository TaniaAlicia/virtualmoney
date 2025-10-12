"use client";

import MobileCrumb from "@/components/generals/MobileCrumb";
import SelectedCard from "@/components/add-money/SelectedCard";
import { useCards } from "@/hooks/useCards";

export default function CardPage() {
  const {
    loading,
    error,
    cards,
    deletingId: deletingCardId,
    removeCard,
  } = useCards(); // carga automática de tarjetas

  const accountId = 1; // por ahora fijo (luego puedes traerlo del contexto de usuario)
  const token = "fake-token"; // igual, luego reemplazas con el real

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-5 bg-gray1 px-6 pb-6 pt-0 text-dark">
      {/* Migas de pan (mobile) */}
      <MobileCrumb />

      {/* Estado de carga / error */}
      {loading && <p className="text-dark2">Cargando tarjetas…</p>}
      {!loading && error && <p className="text-red-600">Error: {error}</p>}

      {/* Lista de tarjetas + botón continuar */}
      {!loading && (
        <SelectedCard
          cardsList={cards ?? []}
          accountId={accountId}
          token={token}
          showAddMoneyPage
          onDeleteCard={removeCard} 
          deletingId={deletingCardId}
        />
      )}
    </main>
  );
}

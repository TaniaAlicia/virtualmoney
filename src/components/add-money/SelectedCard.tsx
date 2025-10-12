"use client";

import { useState } from "react";
import PlusIcon from "@/components/icons/PlusIcon";
import { CardType } from "@/types/card";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserCards from "@/components/cards/UserCards";
import { toast } from "sonner";

type SelectedCardProps = {
  cardsList: CardType[];
  accountId: number;
  token: string;
  showAddMoneyPage?: boolean;
  showPayServicePage?: boolean;
  onDeleteCard?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null;
};

export default function SelectedCard({
  cardsList,
  accountId,
  token,
  showAddMoneyPage,
  showPayServicePage,
  onDeleteCard,
  deletingId,
}: SelectedCardProps) {
  const router = useRouter();
  const [selectedCardId, setSelectedCardId] = useState<CardType["id"] | null>(null);

  const handleAction = () => {
    if (!selectedCardId) {
      toast.error("Por favor selecciona una tarjeta");
      return;
    }

    toast.success("Redirigiendo...");
    router.push("/dashboard/add-money/card/amount");
  };

  return (
    <section className="flex flex-col gap-5">
      {/* Caja principal */}
      <div className="bg-dark flex flex-col gap-3 rounded-[10px] p-5 md:px-12 md:py-12 shadow-sm">
        {/* Título */}
        <h2 className="font-bold text-xl text-green pb-3 md:text-2xl">
          Seleccionar tarjeta
        </h2>

        {/* Lista de tarjetas (modo selección activo) */}
        <UserCards
          cardsList={cardsList}
          selectable // 👈 activa los círculos tipo radio
          selectedId={selectedCardId}
          onSelect={setSelectedCardId}
          onDelete={onDeleteCard}
          deletingId={deletingId ?? null}
        />

        {/* Nueva tarjeta + botón continuar */}
        <div className="w-full md:flex md:flex-col xl:flex-row md:gap-3 md:justify-between md:items-start xl:items-center xl:mt-5">
          {/* Nueva tarjeta */}
          <Link
            href="/dashboard/cards/add-card"
            className="w-full flex flex-col md:gap-5 pt-4 pb-2"
          >
            <div className="flex items-center justify-start gap-4 md:pt-2 md:pb-3">
              <PlusIcon className="w-7 h-7 md:w-8 md:h-8 text-green" />
              <p className="text-green font-bold md:text-xl">Nueva tarjeta</p>
            </div>
          </Link>

          {/* Botón continuar (desktop) */}
          <div className="hidden md:w-full xl:w-2/4 md:flex md:h-[64px] xl:justify-end md:items-center">
            <button
              onClick={handleAction}
              className={clsx(
                "p-5 md:w-full xl:w-[233px] font-bold text-center text-dark rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] transition",
                selectedCardId
                  ? "bg-[#C1FD35] hover:brightness-110"
                  : "bg-gray-400 cursor-not-allowed opacity-80",
              )}
              disabled={!selectedCardId}
            >
              {showPayServicePage ? "Pagar" : "Continuar"}
            </button>
          </div>
        </div>
      </div>

      {/* Botón continuar (mobile) */}
      <div className="w-full mb-5 h-[50px] flex justify-end md:hidden">
        <button
          onClick={handleAction}
          className={clsx(
            "p-3 w-[165px] font-bold text-dark rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] transition",
            selectedCardId
              ? "bg-[#C1FD35] hover:brightness-110"
              : "bg-gray-400 cursor-not-allowed opacity-80",
          )}
          disabled={!selectedCardId}
        >
          {showPayServicePage ? "Pagar" : "Continuar"}
        </button>
      </div>
    </section>
  );
}

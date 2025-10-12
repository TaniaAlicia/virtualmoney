"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PlusIcon from "@/components/icons/PlusIcon";
import UserCards from "@/components/cards/UserCards";
import CustomToaster from "@/components/generals/CustomToaster";

import { CardType } from "@/types/card";
import { useSelectCard } from "@/context/moneyContext";
import { useTransaction } from "@/context/transactionContext";

type SelectedCardProps = {
  cardsList: CardType[];
  accountId: number;
  token: string;
  accountCvu?: string;
  onDeleteCard?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null;
};

export default function SelectedCard({
  cardsList,
  accountId,
  accountCvu,
  onDeleteCard,
  deletingId,
}: SelectedCardProps) {
  const router = useRouter();
  const { setCardId } = useSelectCard();
  const { setTransaction } = useTransaction();
  const [selectedCardId, setSelectedCardId] = useState<CardType["id"] | null>(null);

  // 🔁 Sincroniza selección local con global
  useEffect(() => {
    if (selectedCardId) setCardId(selectedCardId);
  }, [selectedCardId, setCardId]);

  // 💳 Validar selección antes de continuar
  const handleAddMoney = () => {
    if (!selectedCardId) {
      toast.error("Por favor seleccioná una tarjeta", {
        style: {
          background: "#ffebeb",
          color: "#d60000",
          fontWeight: 600,
          border: "1px solid #ffbaba",
        },
      });
      return;
    }

    // ✅ Guardamos sólo la selección, sin crear el depósito aún
    setTransaction({
      id: 0,
      account_id: accountId,
      amount: 0,
      dated: new Date().toISOString(),
      description: "Ingreso de dinero",
      destination: "Digital Money House",
      origin: "Cuenta propia",
      type: "deposit",
      destinationCvu: accountCvu,
    });

    toast.success("Tarjeta seleccionada correctamente");
    router.push("/dashboard/add-money/card/amount");
  };

  return (
    <section className="flex flex-col gap-5">
      <CustomToaster />

      <div className="flex flex-col gap-3 rounded-[10px] bg-dark p-5 shadow-sm md:px-12 md:py-12">
        <h2 className="pb-3 text-xl font-bold text-green md:text-2xl">
          Seleccionar tarjeta
        </h2>

        {/* Lista de tarjetas */}
        <UserCards
          cardsList={cardsList}
          selectable
          selectedId={selectedCardId}
          onSelect={(cardId) => {
            const card = cardsList.find((c) => c.id === cardId);
            setSelectedCardId(cardId);
            if (card?.number_id) {
              toast.success(
                `Se seleccionó la tarjeta terminada en ${card.number_id
                  .toString()
                  .slice(-4)}`
              );
            }
          }}
          onDelete={onDeleteCard}
          deletingId={deletingId ?? null}
        />

        {/* Nueva tarjeta + botón continuar */}
        <div className="w-full md:flex md:flex-col md:items-start md:justify-between md:gap-3 xl:mt-5 xl:flex-row xl:items-center">
          <Link
            href="/dashboard/cards/new-card"
            className="flex w-full flex-col pb-2 pt-4 md:gap-5"
          >
            <div className="flex items-center justify-start gap-4 md:pb-3 md:pt-2">
              <PlusIcon className="h-7 w-7 text-green md:h-8 md:w-8" />
              <p className="font-bold text-green md:text-xl">Nueva tarjeta</p>
            </div>
          </Link>

          <div className="hidden md:flex md:h-[64px] md:w-full md:items-center xl:w-2/4 xl:justify-end">
            <button
              onClick={handleAddMoney}
              className={clsx(
                "rounded-[10px] p-5 text-center font-bold text-dark shadow transition md:w-full xl:w-[233px]",
                selectedCardId
                  ? "bg-[#C1FD35] hover:brightness-110"
                  : "bg-gray-400 hover:brightness-105"
              )}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>

      {/* Botón continuar (mobile) */}
      <div className="mb-5 flex h-[50px] w-full justify-end md:hidden">
        <button
          onClick={handleAddMoney}
          className={clsx(
            "w-[165px] rounded-[10px] p-3 font-bold text-dark shadow transition",
            selectedCardId
              ? "bg-[#C1FD35] hover:brightness-110"
              : "bg-gray-400 hover:brightness-105"
          )}
        >
          Continuar
        </button>
      </div>
    </section>
  );
}

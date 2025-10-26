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
  token?: string;
  accountCvu?: string;
  onDeleteCard?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null;

  /** Reutilización del CTA */
  ctaText?: string; // default: "Continuar"
  onContinue?: () => void; // si viene, se usa como acción principal
  showNewCardLink?: boolean; // default: true (en checked: false)
  ctaAlwaysGreen?: boolean; // default: false (en checked: true)
};

export default function SelectedCard({
  cardsList,
  accountId,
  accountCvu,
  onDeleteCard,
  deletingId,
  ctaText = "Continuar",
  onContinue,
  showNewCardLink = true,
  ctaAlwaysGreen = false,
}: SelectedCardProps) {
  const router = useRouter();
  const { setCardId } = useSelectCard();
  const { setTransaction } = useTransaction();
  const [selectedCardId, setSelectedCardId] = useState<CardType["id"] | null>(
    null,
  );

  useEffect(() => {
    if (selectedCardId) setCardId(selectedCardId);
  }, [selectedCardId, setCardId]);

  const handlePrimaryAction = () => {
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

    if (onContinue) {
      onContinue(); // ej: Pagar
      return;
    }

    // fallback: flujo de Add Money
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

  const btnColor = ctaAlwaysGreen
    ? "bg-[#C1FD35] hover:brightness-110"
    : selectedCardId
      ? "bg-[#C1FD35] hover:brightness-110"
      : "bg-gray1 text-dark/70 hover:brightness-105"; // gris clarito cuando no hay selección (modo Add Money)

  return (
    <section className="flex flex-col gap-5">
      <CustomToaster />

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
                .slice(-4)}`,
            );
          }
        }}
        onDelete={onDeleteCard}
        deletingId={deletingId ?? null}
      />

      <div className="hidden items-center justify-between md:flex">
        {showNewCardLink ? (
          <Link
            href="/dashboard/cards/new-card"
            className="flex items-center gap-3"
          >
            <PlusIcon className="h-7 w-7 text-green md:h-8 md:w-8" />
            <span className="font-bold text-green md:text-xl">
              Nueva tarjeta
            </span>
          </Link>
        ) : (
          <span /> // placeholder para mantener el CTA a la derecha
        )}

        <button
          onClick={handlePrimaryAction}
          className={clsx(
            "w-[180px] h-[50px] rounded-[10px] text-center font-bold text-dark shadow transition",
            btnColor,
          )}
        >
          {ctaText}
        </button>
      </div>

      {/* CTA móvil (ancho completo) */}
      <div className= "flex w-full justify-end md:hidden">
        <button
          onClick={handlePrimaryAction}
          className={clsx(
            "w-[133px] h-[50px] h-[50px]rounded-[10px] font-bold text-dark shadow transition",
            btnColor,
          )}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}

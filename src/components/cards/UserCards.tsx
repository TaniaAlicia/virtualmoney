"use client";
import { useState } from "react";
import type { CardType } from "@/types/card";
import clsx from "clsx";

type Props = {
  cardsList: CardType[];
  onDelete?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null;
  selectable?: boolean;
  selectedId?: CardType["id"] | null;
  onSelect?: (id: CardType["id"]) => void;
};

export default function UserCards({
  cardsList,
  onDelete,
  deletingId,
  selectable = false,
  selectedId,
  onSelect,
}: Props) {
  const LIMIT = 10;
  const [selected, setSelected] = useState<CardType["id"] | null>(
    selectedId ?? null,
  );

  const handleSelect = (id: CardType["id"]) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <section className="w-full rounded-[10px] bg-white p-6 shadow">
      <h4 className="mb-4 font-bold text-dark">Tus tarjetas</h4>

      <ul className="flex flex-col">
        {cardsList?.map((card) => {
          const busy = deletingId === card.id;
          const isSelected = selected === card.id;

          return (
            <li
              key={card.id}
              className="flex items-center justify-between border-b border-black/10 py-4 last:border-b-0"
            >

              <div className="flex items-center gap-3">
                <span className="inline-block h-4 w-4 rounded-full bg-[#C1FD35]" />
                <span className="select-none text-[15px] text-dark">
                  Terminada en {card.last4}
                </span>
              </div>

              {selectable ? (
                <span
                  onClick={() => handleSelect(card.id)}
                  className={clsx(
                    "relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-dark transition-all duration-150",
                    "hover:brightness-110",
                    isSelected && "bg-[#C1FD35]",
                  )}
                >
                  {isSelected && (
                    <span className="absolute h-3 w-3 rounded-full bg-dark" />
                  )}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onDelete?.(card.id)}
                  disabled={busy}
                  className={clsx(
                    "font-bold text-dark2 hover:underline",
                    busy && "cursor-not-allowed opacity-50",
                  )}
                  aria-busy={busy}
                >
                  {busy ? "Eliminando…" : "Eliminar"}
                </button>
              )}
            </li>
          );
        })}

        {/* Sin tarjetas */}
        {cardsList?.length === 0 && (
          <li className="py-2 text-dark2">No tienes tarjetas asociadas</li>
        )}
      </ul>

      {/* Límite */}
      {cardsList?.length >= LIMIT && (
        <p className="mt-3 text-sm text-error">
          Has alcanzado el <b>límite de 10 tarjetas</b>. Para agregar una nueva,
          elimina una existente.
        </p>
      )}

      {cardsList?.length > LIMIT && (
        <p className="mt-1 text-xs text-dark2">
          Mostrando 10 de {cardsList.length}.
        </p>
      )}
    </section>
  );
}

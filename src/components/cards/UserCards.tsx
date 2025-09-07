"use client";
import type { CardType } from "@/types/card";

type Props = {
  cardsList: CardType[];
  onDelete?: (id: CardType["id"]) => void;
  deletingId?: CardType["id"] | null; 
};

export default function UserCards({ cardsList, onDelete, deletingId }: Props) {
   const LIMIT = 10; 
  //const visible = (cardsList ?? []).slice(0, LIMIT);
  return (
    <section className="w-full rounded-[10px] bg-white shadow p-6">
      <h4 className="text-dark font-bold mb-4">Tus tarjetas</h4>
      <ul className="flex flex-col">
        {cardsList?.map((card) => {
          const busy = deletingId === card.id; 
          return (
            <li
              key={card.id}
              className="flex items-center justify-between py-4 border-b border-black/10 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block h-4 w-4 rounded-full bg-[#C1FD35]" />
                <span className="text-dark2">Terminada en {card.last4}</span>
              </div>
              <button
                type="button"
                onClick={() => onDelete?.(card.id)}
                disabled={busy}
                className={`text-dark2 font-bold hover:underline ${busy ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-busy={busy}
              >
                {busy ? "Eliminando…" : "Eliminar"}
              </button>
            </li>
          );
        })}
        {cardsList?.length === 0 && (
          <li className="text-dark2 py-2">No tienes tarjetas asociadas</li>
        )}
      </ul>
       
      {cardsList?.length >= LIMIT && (
        <p className="mt-3 text-sm text-error">
          Has alcanzado el <b>límite de 10 tarjetas</b>. Para agregar una nueva,
          elimina una existente.
        </p>
      )}

      {/* CHANGED: si hay más de 10, aclaramos que se muestran sólo 10 */}
      {cardsList?.length > LIMIT && (
        <p className="mt-1 text-xs text-dark2">
          Mostrando 10 de {cardsList.length}.
        </p>
      )}
    </section>
  );
}

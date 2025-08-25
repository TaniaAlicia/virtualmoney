"use client";

import Link from "next/link";
import type { TransactionType } from "@/types/transaction";

type Props = {
  loading: boolean;
  transactions: TransactionType[];
  //accountId: number; // por si lo necesitas luego
};

export default function ActivitySection({
  loading,
  transactions,
  //accountId,
}: Props) {
  return (
    <>
      {/* Buscar en tu actividad */}
      <div className="rounded-xl bg-light px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          {/* Lupa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-dark/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="w-full border-none bg-transparent text-dark2 placeholder-dark2/70 outline-none"
          />
        </div>
      </div>

      {/* Tu actividad */}
      <div className="rounded-xl bg-light p-5 shadow">
        <h2 className="text-base font-semibold text-dark2">Tu actividad</h2>
        <div className="mt-3 h-px w-full bg-[#D9D9D9]" />

        {loading ? (
          <p className="mt-4 text-sm text-dark/70">Cargando...</p>
        ) : transactions.length === 0 ? (
          <p className="mt-4 text-sm text-dark/70">
            No hay movimientos en tu cuenta.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="text-dark1 flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium">
                    {tx.description || "Sin descripción"}
                  </p>
                  <p className="text-xs text-gray2">
                    {tx.createdAt
                      ? new Date(tx.createdAt).toLocaleDateString("es-AR")
                      : ""}
                  </p>
                </div>

                <p
                  className={`font-semibold ${
                    tx.type === "in" ? "text-green" : "text-red-500"
                  }`}
                >
                  {tx.type === "in" ? "+" : "-"}$
                  {(tx.amount ?? 0).toLocaleString("es-AR")}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/dashboard/activity"
            className="text-sm font-semibold text-dark no-underline decoration-green/60 underline-offset-2 hover:decoration-green"
          >
            Ver toda tu actividad
          </Link>

          {/* Flecha → con línea (NEGRA) */}
          <Link
            href="/dashboard/activity"
            className="text-sm font-semibold text-dark no-underline decoration-green/60 underline-offset-2 hover:decoration-green"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 flex-none text-dark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12h14m0 0l-4-4m4 4l-4 4"
            />
          </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

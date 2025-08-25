"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BaseLayout from "@/components/generals/BaseLayout";
import ActivitySection from "@/components/dashboard/ActivitySection";
// importa tu fetch real (ej: getAllTransactions(accountId))
/* import { useTransactions } from "@/hooks/useTransactions"; */

export default function ActivityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1) tomar `q` del querystring y reflejarlo en el input
  const initialQ = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQ);

  useEffect(() => setSearch(initialQ), [initialQ]);

  // 2) navegar al presionar Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = (e.currentTarget.value || "").trim();
      router.push(
        q
          ? `/dashboard/activity?q=${encodeURIComponent(q)}`
          : `/dashboard/activity`,
      );
    }
  };

  // ---------------------------
  // Reemplaza estas dos líneas por tu data real:
  const loading = false;
  const transactions: any[] = [];
  // ---------------------------

  // 3) filtrar de forma local para que el listado reaccione al texto
  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter((tx: any) => {
      const desc = (tx.description || "").toLowerCase();
      const amount = String(tx.amount ?? "").toLowerCase();
      const date = tx.createdAt
        ? new Date(tx.createdAt).toLocaleDateString("es-AR").toLowerCase()
        : "";
      return desc.includes(q) || amount.includes(q) || date.includes(q);
    });
  }, [transactions, search]);

  return (
    <BaseLayout variant="dashboard">
      <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
        {/* Buscador + botón Filtrar (el botón va SOLO en esta página) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr,220px]">
          {/* Buscador */}
          <div className="flex items-center gap-2 rounded-xl bg-light px-4 py-3 shadow">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full border-none bg-transparent text-dark2 placeholder-dark2/70 outline-none"
            />
          </div>

          {/* Botón Filtrar (solo md+) */}
          <button
            type="button"
            className="hidden items-center justify-between rounded-xl bg-green px-5 py-3 font-bold text-black shadow hover:brightness-95 md:flex"
            onClick={() => {
              // TODO: abrir panel de filtros cuando lo implementes
            }}
          >
            Filtrar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="13"
              fill="none"
                          >
              <path stroke="#201F22" d="M0 9.7h17M17 2.767H0" />
              <circle
                cx="5.099"
                cy="9.633"
                r="2.333"
                fill="#C1FD35"
                stroke="#201F22"
              />
              <circle
                cx="11.901"
                cy="2.834"
                r="2.333"
                fill="#C1FD35"
                stroke="#201F22"
                transform="rotate(-180 11.901 2.834)"
              />
            </svg>
          </button>
        </div>

        {/* Listado (misma UI que el dashboard, pero aquí con showActivityPage) */}
        <ActivitySection
          loading={loading}
          transactions={filtered}
          showActivityPage
          hideSearch
        />
      </main>
    </BaseLayout>
  );
}

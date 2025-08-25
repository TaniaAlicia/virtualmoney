"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TransactionType } from "@/types/transaction";
import { useRouter } from "next/navigation";

type Props = {
  loading: boolean;
  transactions: TransactionType[];
  /** opcional: limitar cantidad en el dashboard (p.ej. 4) */
  limit?: number;
  /** si es la página completa de actividad, oculta el link “Ver toda tu actividad” */
  showActivityPage?: boolean;
  hideSearch?: boolean;
};

export default function ActivitySection({
  loading,
  transactions,
  limit,
  showActivityPage = false,
  hideSearch = false,
}: Props) {
  const [search, setSearch] = useState("");

  const router = useRouter();

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

  const norm = (s: string) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = norm(search);
    return transactions.filter((tx) => {
      const desc = norm(tx.description || "");
      const date = tx.createdAt
        ? norm(new Date(tx.createdAt).toLocaleDateString("es-AR"))
        : "";
      const amount = norm(String(tx.amount ?? ""));
      return desc.includes(q) || date.includes(q) || amount.includes(q);
    });
  }, [search, transactions]);

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <>
      {/* Buscar en tu actividad (se oculta si hideSearch === true) */}
      {!hideSearch && (
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full border-none bg-transparent text-dark2 placeholder-dark2/70 outline-none"
            />
          </div>
        </div>
      )}

      {/* Tu actividad */}
      <div className="rounded-xl bg-light p-5 shadow">
        <h2 className="text-base font-semibold text-dark2">Tu actividad</h2>
        <div className="mt-3 h-px w-full bg-[#D9D9D9]" />

        {loading ? (
          <p className="mt-4 text-sm text-dark/70">Cargando...</p>
        ) : visible.length === 0 ? (
          <p className="mt-4 text-sm text-dark/70">
            No hay movimientos en tu cuenta.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {visible.map((tx) => (
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

        {!showActivityPage && (
          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/dashboard/activity"
              className="text-sm font-semibold text-dark no-underline decoration-green/60 underline-offset-2 hover:decoration-green"
            >
              Ver toda tu actividad
            </Link>

            <Link
              href="/dashboard/activity"
              aria-label="Ir a actividad completa"
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
        )}
      </div>
    </>
  );
}

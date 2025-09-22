"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TransactionType } from "@/types/transaction";
import { useRouter } from "next/navigation";

// helpers
const CREDIT_TYPES = new Set(["in", "deposit", "transfer_in", "refund"]);
const DEBIT_TYPES = new Set(["out", "payment", "transfer_out", "fee"]);

// helper para ordenar activitys
function toMs(dateLike?: string | number | Date) {
  if (dateLike == null) return -Infinity;
  if (dateLike instanceof Date) return dateLike.getTime();
  if (typeof dateLike === "number")
    return dateLike < 1e12 ? dateLike * 1000 : dateLike;

  const s = String(dateLike).trim();
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return t;

  // dd/mm/yyyy o dd-mm-yyyy
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const [, d, mo, y] = m.map(Number);
    return new Date(y, mo - 1, d).getTime();
  }

  const n = Number(s);
  if (!Number.isNaN(n)) return n < 1e12 ? n * 1000 : n;
  return -Infinity;
}

// acepta createdAt | dated | created_at | date | updatedAt
function getCreatedTs(tx: any) {
  const raw =
    tx?.createdAt ?? tx?.dated ?? tx?.created_at ?? tx?.date ?? tx?.updatedAt;
  return toMs(raw);
}

function dayNameFrom(tx: any) {
  const ts = getCreatedTs(tx);
  if (!Number.isFinite(ts)) return "";
  return new Date(ts).toLocaleDateString("es-AR", {
    weekday: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

////////////////////////////////

function isCredit(type?: string, amount?: number) {
  const t = String(type ?? "").toLowerCase();
  if (CREDIT_TYPES.has(t)) return true;
  if (DEBIT_TYPES.has(t)) return false;
  // fallback: si el tipo es raro, decidimos por signo
  return Number(amount ?? 0) > 0;
}
function absAmount(n?: number) {
  return Math.abs(Number(n ?? 0));
}
function formatARS(n: number) {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
}
function dayName(dateISO?: string) {
  if (!dateISO) return "";
  return new Date(dateISO).toLocaleDateString("es-AR", {
    weekday: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

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

  const [page, setPage] = useState(1); // 👈 página actual
  const PAGE_SIZE = 10;

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
    //const q = norm(search);
    const q = search.toLowerCase();
    return transactions.filter((tx: TransactionType) => {
      const desc = norm(tx.description || "").toLowerCase();
      const amount = String(tx.amount ?? "").toLowerCase();
      const ts = getCreatedTs(tx);
      const date = Number.isFinite(ts)
        ? new Date(ts).toLocaleDateString("es-AR").toLowerCase()
        : "";

      return desc.includes(q) || date.includes(q) || amount.includes(q);
    });
  }, [search, transactions]);

  //Ordenar de más reciente a más antigua por createdAt
  const filteredSorted = useMemo<TransactionType[]>(
    () => [...filtered].sort((a, b) => getCreatedTs(b) - getCreatedTs(a)),
    [filtered],
  );

  // Si hay limit (dashboard), respetalo y NO pagines.
  const totalPages = useMemo(
    () =>
      limit ? 1 : Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE)),
    [filteredSorted.length, limit],
  );

  // Resetear a la página 1 cuando cambia la búsqueda o la data
  useEffect(() => {
    setPage(1);
  }, [search, filteredSorted.length, limit]);

  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = limit
    ? filteredSorted.slice(0, limit)
    : filteredSorted.slice(start, start + PAGE_SIZE);

  const visible = slice;

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
            {visible.map((tx) => {
              const credit = isCredit(tx.type, tx.amount);
              const shown = formatARS(absAmount(tx.amount));
              const sign = credit ? "+" : "-";

              return (
                <li
                  key={tx.id}
                  className="text-dark1 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* bullet verde/cruz roja, opcional */}
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${credit ? "bg-green" : "bg-error"}`}
                    />
                    <div>
                      <p className="font-medium">
                        {tx.description || "Sin descripción"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <p
                      className={`font-semibold ${credit ? "text-dark" : "text-error"}`}
                    >
                      {sign} {shown}
                    </p>
                    <p className="text-xs leading-4  text-gray2 ">
                      {dayNameFrom(tx)}
                    </p>
                  </div>
                </li>
              );
            })}
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

        {/* Paginador: solo si NO hay limit y hay más de 10 */}
        {!limit && totalPages > 1 && (
          <nav
            className="mt-4 flex items-center justify-center gap-3"
            aria-label="Paginación"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium
          ${
            n === currentPage
              ? "cursor-default bg-[#D9D9D9] text-black"
              : "cursor-pointer text-dark hover:bg-black/5"
          }`}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

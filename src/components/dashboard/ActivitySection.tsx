"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TransactionType } from "@/types/transaction";
import { useRouter } from "next/navigation";
import type { DateLike, TxDateSource } from "@/types/date";
import PeriodFilter from "@/components/activity/PeriodFilter";
import Cookies from "js-cookie";

// helpers
const CREDIT_TYPES = new Set(["in", "deposit", "transfer_in", "refund"]);
const DEBIT_TYPES = new Set(["out", "payment", "transfer_out", "fee"]);

// helper para ordenar activitys
function toMs(dateLike?: DateLike): number {
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
function getCreatedTs(tx: TxDateSource) {
  const raw =
    tx?.createdAt ?? tx?.dated ?? tx?.created_at ?? tx?.date ?? tx?.updatedAt;
  return toMs(raw);
}

function dayNameFrom(tx: TxDateSource) {
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

type Props = {
  loading: boolean;
  transactions: TransactionType[];
  limit?: number;
  /** si es la página completa de actividad, oculta el link “Ver toda tu actividad” */
  showActivityPage?: boolean;
  hideSearch?: boolean;
  enableSearchFilter?: boolean;
  //  props SOLO para móvil
  enableMobileFilter?: boolean; // <- activa el botón "Filtrar" en el header (md:hidden)
  showFilters?: boolean; // <- estado abierto/cerrado (viene del padre)
  onToggleFilters?: () => void; // <- abre/cierra
  periodSelected?: string; // <- "today" | "week" | "custom" ...
  onApplyPeriod?: (v: string) => void; // <- aplica período estándar
  onClearPeriod?: () => void; // <- limpia período
  onApplyCustomPeriod?: (fromISO: string, toISO: string) => void; // <- aplicar período custom
  onApplyOperationType?: (type: string) => void;
};

export default function ActivitySection({
  loading,
  transactions,
  limit,
  showActivityPage = false,
  hideSearch = false,
  enableSearchFilter = true,
  // móvil
  enableMobileFilter,
  showFilters,
  onToggleFilters,
  periodSelected,
  onApplyPeriod,
  onClearPeriod,
  onApplyCustomPeriod,
  onApplyOperationType,
}: Props) {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const accId = Cookies.get("accountId") ?? "";

  const [page, setPage] = useState(1);
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
    if (!enableSearchFilter) return transactions;
    if (!search.trim()) return transactions;
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

  // Si hay limit (dashboard), respetarolo y no paginar
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
      {/* Buscar en Tu actividad (se oculta si hideSearch === true) */}
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
      <div className="relative rounded-xl bg-light p-5 shadow">
        {/* header: título + botón Filtrar SOLO en móvil */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-dark2">Tu actividad</h2>
          {/* botón Filtrar móvil (md:hidden) */}
          {enableMobileFilter && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFilters?.();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-dark underline decoration-green/60 underline-offset-2 hover:decoration-green md:hidden"
              aria-expanded={!!showFilters}
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
          )}
        </div>

        <div className="mt-3 h-px w-full bg-[#D9D9D9]" />

        {/* popover anclado al header en móvil */}
        {enableMobileFilter && showFilters && (
          <div className="absolute right-4 top-8 z-50 md:hidden">
            <PeriodFilter
              // ancho responsivo: ocupa casi todo en móvil, 320px en md+
              className="w-[calc(100vw-2.5rem)] max-w-[320px]"
              selected={periodSelected ?? ""}
              onApply={(val, type) => {
                onApplyPeriod?.(val);
                onApplyOperationType?.(type ?? "all"); // ✅ ahora se propaga al padre
                onToggleFilters?.();
              }}
              onApplyCustom={(fromISO, toISO, type) => {
                onApplyCustomPeriod?.(fromISO, toISO);
                onApplyOperationType?.(type ?? "all"); // ✅ también aquí
                onToggleFilters?.();
              }}
              onClear={() => {
                onClearPeriod?.(); // limpia fechas
                onApplyOperationType?.("all"); // ✅ limpia tipo también
                onToggleFilters?.(); // cierra el panel
              }}
              onClose={onToggleFilters ?? (() => {})}
            />
          </div>
        )}

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

              /*  const href = `/dashboard/activity/detail?id=${encodeURIComponent(
                String(tx.id),
              )}${accId ? `&acc=${encodeURIComponent(accId)}` : ""}`; */

              return (
                <li
                  key={tx.id}
                  className="text-dark1 relative flex items-center justify-between text-sm"
                >
                  {/* overlay que hace clickeable toda la fila */}
                  <Link
                    href={`/dashboard/activity/detail?id=${tx.id}&account=${tx.accountId ?? accId}`}
                    className="absolute inset-0"
                  />

                  <div className="pointer-events-none flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${credit ? "bg-green" : "bg-error"}`}
                    />
                    <div>
                      <p className="font-medium">
                        {tx.description || "Sin descripción"}
                      </p>
                    </div>
                  </div>

                  <div className="pointer-events-none flex flex-col items-end text-right">
                    <p
                      className={`font-semibold ${credit ? "text-dark" : "text-error"}`}
                    >
                      {sign} {shown}
                    </p>
                    <p className="text-xs leading-4 text-gray2">
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

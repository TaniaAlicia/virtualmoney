"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react"; // 🔁 useRef agregado
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardData } from "@/hooks/useDashboardData";
import MobileCrumb from "@/components/generals/MobileCrumb";
import ActivitySection from "@/components/dashboard/ActivitySection";
import type { TransactionType } from "@/types/transaction";
import PeriodFilter from "@/components/activity/PeriodFilter";

export default function Activity() {
  return (
    <Suspense fallback={null}>
      <ActivityInner />
    </Suspense>
  );
}

function ActivityInner() {
  const { loading, transactions } = useDashboardData();

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQ);

  const [showFilters, setShowFilters] = useState(false);
  const [period, setPeriod] = useState<string>(""); // "", "today", "yesterday", "week", "15days", "month", "year"
  const [customFrom, setCustomFrom] = useState<Date | null>(null);
  const [customTo, setCustomTo] = useState<Date | null>(null);

  const [operationType, setOperationType] = useState<string>("all"); // ✅ nuevo: tipo de operación

  useEffect(() => setSearch(initialQ), [initialQ]);

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

  /* const filteredByText = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter((tx: TransactionType) => {
      const desc = (tx.description || "").toLowerCase();
      const amount = String(tx.amount ?? "").toLowerCase();
      const date = tx.createdAt
        ? new Date(tx.createdAt).toLocaleDateString("es-AR").toLowerCase()
        : "";
      return desc.includes(q) || amount.includes(q) || date.includes(q);
    });
  }, [transactions, search]); */

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d: Date, days: number) =>
    new Date(d.getTime() + days * 86400000);

  const parseLocalDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1); // crea Date en hora local
  };

  //helpers de rango según período
  const getRangeFor = (p: string): { from?: Date; to?: Date } => {
    const now = new Date();
    const today0 = startOfDay(now);
    switch (p) {
      case "today":
        return { from: today0, to: addDays(today0, 1) };
      case "yesterday": {
        const y0 = addDays(today0, -1);
        return { from: y0, to: today0 };
      }
      case "week":
        return { from: addDays(today0, -7), to: addDays(today0, 1) };
      case "15days":
        return { from: addDays(today0, -15), to: addDays(today0, 1) };
      case "month":
        return { from: addDays(today0, -30), to: addDays(today0, 1) };
      case "3months":
        return { from: addDays(today0, -90), to: addDays(today0, 1) };
      /* case "year":
        return { from: addDays(today0, -365), to: addDays(today0, 1) }; */
      case "custom": // lo que eligió el usuario
        if (customFrom && customTo) {
          const from = startOfDay(customFrom);
          const to = addDays(startOfDay(customTo), 1); // incluir “hasta”
          return { from, to };
        }
        return {};
      default:
        return {};
    }
  };

  // helpers para leer el timestamp desde múltiples campos (igual que ActivitySection)
  type DateLike = string | number | Date | undefined | null; // 🆕
  type TxDateSource = {
    createdAt?: DateLike;
    dated?: DateLike;
    created_at?: DateLike;
    date?: DateLike;
    updatedAt?: DateLike;
  }; // 🆕

  function toMs(dateLike?: DateLike): number {
    // 🆕
    if (dateLike == null) return NaN;
    if (dateLike instanceof Date) return dateLike.getTime();
    if (typeof dateLike === "number")
      return dateLike < 1e12 ? dateLike * 1000 : dateLike;

    const s = String(dateLike).trim();
    const t = Date.parse(s);
    if (!Number.isNaN(t)) return t;

    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const [, d, mo, y] = m.map(Number);
      return new Date(y, mo - 1, d).getTime();
    }

    const n = Number(s);
    if (!Number.isNaN(n)) return n < 1e12 ? n * 1000 : n;
    return NaN;
  }

  function getCreatedTs(tx: TxDateSource): number {
    // 🆕
    return toMs(
      tx.createdAt ?? tx.dated ?? tx.created_at ?? tx.date ?? tx.updatedAt,
    );
  }

  const filtered = useMemo(() => {
    // 1️⃣ Base: todas las transacciones
    let result = transactions;

    // 2️⃣ Filtro de texto (si hay búsqueda activa)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((tx: TransactionType) => {
        const desc = (tx.description || "").toLowerCase();
        const amount = String(tx.amount ?? "").toLowerCase();
        const date = tx.createdAt
          ? new Date(tx.createdAt).toLocaleDateString("es-AR").toLowerCase()
          : "";
        return desc.includes(q) || amount.includes(q) || date.includes(q);
      });
    }

    // 3️⃣ Filtro de fechas (solo si hay período seleccionado)
    if (period) {
      const { from, to } = getRangeFor(period);
      const fromMs = from?.getTime();
      const toMs = to?.getTime();
      result = result.filter((tx: TransactionType) => {
        const ts = getCreatedTs(tx);
        if (!Number.isFinite(ts)) return false;
        return (fromMs == null || ts >= fromMs) && (toMs == null || ts < toMs);
      });
    }

    // 4️⃣ Filtro por tipo de operación (siempre)
    if (operationType !== "all") {
      result = result.filter((tx: TransactionType) => {
        const amount = Number(tx.amount ?? 0);
        const isIncome = amount > 0;
        return operationType === "ingresos" ? isIncome : !isIncome;
      });
    }

    return result;
  }, [transactions, search, period, customFrom, customTo, operationType]);

  // wrapper para botón + popover (para detectar click afuera)
  const filterWrapRef = useRef<HTMLDivElement>(null);

  // cerrar popover SOLO si el click ocurre fuera del wrapper
  useEffect(() => {
    if (!showFilters) return;

    //  Solo desktop: evita que el popover móvil se cierre al click interno
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const onDocPointerDown = (e: PointerEvent) => {
      if (!filterWrapRef.current?.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [showFilters]);

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 bg-gray1 px-6 pb-6 pt-0 text-dark">
      <MobileCrumb />

      {/* Buscador + botón Filtrar */}
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr,220px]">
        {/* Buscador */}
        <div className="flex items-center gap-2 rounded-xl bg-light px-4 py-3 shadow">
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
        <div
          ref={filterWrapRef}
          className="relative hidden overflow-visible md:block"
        >
          <button
            type="button"
            className="hidden w-full items-center justify-between rounded-xl bg-green px-5 py-3 font-bold text-black shadow hover:brightness-95 md:flex"
            onClick={() => setShowFilters((s) => !s)}
          >
            {period ? "Período: aplicado" : "Filtrar"}
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
          {/* popover de filtros */}
          {showFilters && (
            <div className="absolute right-0 top-full z-50 ">
              <PeriodFilter
                selected={period}
                onApply={(val, type) => {
                  setPeriod(val);
                  setOperationType(type ?? "all");
                }}
                onApplyCustom={(fromISO, toISO, type) => {
                  setCustomFrom(parseLocalDate(fromISO));
                  setCustomTo(parseLocalDate(toISO));
                  setPeriod("custom");
                  setOperationType(type ?? "all");
                }}
                onClear={() => {
                  setPeriod("");
                  setCustomFrom(null);
                  setCustomTo(null);
                  setOperationType("all");
                }}
                onClose={() => setShowFilters(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Listado */}
      <ActivitySection
        loading={loading}
        transactions={filtered}
        showActivityPage
        hideSearch
        /* activa el botón Filtrar en el header del card SOLO móvil */
        enableMobileFilter
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((s) => !s)}
        periodSelected={period}
        onApplyPeriod={(v) => setPeriod(v)}
        onApplyOperationType={(t) => setOperationType(t)}
        onClearPeriod={() => {
          setPeriod("");
          setCustomFrom(null);
          setCustomTo(null);
        }}
        onApplyCustomPeriod={(fromISO, toISO) => {
          setCustomFrom(parseLocalDate(fromISO));
          setCustomTo(parseLocalDate(toISO));
          setPeriod("custom");
        }}
      />
    </main>
  );
}

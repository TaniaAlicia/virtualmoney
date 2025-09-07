"use client";

import { useMemo } from "react";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import AccountBalance from "@/components/dashboard/AccountBalance";
import DashboardActions from "@/components/dashboard/DashboardActions";
import ActivitySection from "@/components/dashboard/ActivitySection";
import { useDashboardData } from "@/hooks/useDashboardData";
import MobileCrumb from "@/components/generals/MobileCrumb";

// --- helpers consistentes para crédito/débito ---
const CREDIT_TYPES = new Set(["in", "deposit", "transfer_in", "refund"]);
const DEBIT_TYPES  = new Set(["out", "payment", "transfer_out", "fee"]);

function isCredit(type?: string, amount?: number) {
  const t = String(type ?? "").toLowerCase();
  if (CREDIT_TYPES.has(t)) return true;
  if (DEBIT_TYPES.has(t))  return false;
  // fallback por si type viene raro: signo del monto
  return Number(amount ?? 0) > 0;
}

export default function DashboardPage() {
  const { loading, balance, transactions } = useDashboardData();
  useAuthRedirect();

  // CHANGED: suma con transacciones si hay al menos una
  const hasTx = (transactions?.length ?? 0) > 0;                         // CHANGED
  const txSum = useMemo(() => {                                          // CHANGED
    return (transactions ?? []).reduce((acc, tx) => {
      const amt = Math.abs(Number(tx?.amount ?? 0)); // normalizo a número
      return acc + (isCredit(tx?.type, tx?.amount) ? amt : -amt);
    }, 0);
  }, [transactions]);

  // CHANGED: si hay transacciones, muestro su suma; si no, el balance del server
  const safeBalance = hasTx ? txSum : Number(balance ?? 0);              // CHANGED

  // CHANGED: bloqueo el “—” sólo mientras aún no tengo nada del server y sin tx
  const showLoading = loading && !hasTx && balance == null;              // CHANGED

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
      <MobileCrumb />

      {/* CHANGED: ahora pasamos safeBalance */}
      <AccountBalance balance={safeBalance} loading={showLoading} />      {/* CHANGED */}

      <DashboardActions />

      <ActivitySection
        loading={loading}
        transactions={transactions}
        showActivityPage={false}
      />
    </main>
  );
}

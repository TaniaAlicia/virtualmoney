"use client";

import { useMemo } from "react";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import AccountBalance from "@/components/dashboard/AccountBalance";
import DashboardActions from "@/components/dashboard/DashboardActions";
import ActivitySection from "@/components/dashboard/ActivitySection";
import { useDashboardData } from "@/hooks/useDashboardData";
import MobileCrumb from "@/components/generals/MobileCrumb";

const CREDIT_TYPES = new Set(["in", "deposit", "transfer_in", "refund"]);
const DEBIT_TYPES = new Set(["out", "payment", "transfer_out", "fee"]);

function isCredit(type?: string, amount?: number) {
  const t = String(type ?? "").toLowerCase();
  if (CREDIT_TYPES.has(t)) return true;
  if (DEBIT_TYPES.has(t)) return false;

  return Number(amount ?? 0) > 0;
}

export default function DashboardPage() {
  const { loading, balance, transactions } = useDashboardData();
  useAuthRedirect();

  const hasTx = (transactions?.length ?? 0) > 0;
  const txSum = useMemo(() => {
    return (transactions ?? []).reduce((acc, tx) => {
      const amt = Math.abs(Number(tx?.amount ?? 0));
      return acc + (isCredit(tx?.type, tx?.amount) ? amt : -amt);
    }, 0);
  }, [transactions]);

  const safeBalance = hasTx ? txSum : Number(balance ?? 0);

  const showLoading = loading && !hasTx && balance == null;

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
      <MobileCrumb />

      <AccountBalance balance={safeBalance} loading={showLoading} />

      <DashboardActions />

      <ActivitySection
        loading={loading}
        transactions={transactions}
        showActivityPage={false}
        limit={10}
        enableSearchFilter={false}
      />
    </main>
  );
}

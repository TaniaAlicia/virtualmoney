"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import AccountBalance from "@/components/dashboard/AccountBalance";
import DashboardActions from "@/components/dashboard/DashboardActions";
import ActivitySection from "@/components/dashboard/ActivitySection";


import { useDashboardData } from "@/hooks/useDashboardData";

import MobileCrumb from "@/components/generals/MobileCrumb";

export default function DashboardPage() {
    const { loading, balance, transactions } = useDashboardData();

  useAuthRedirect();

 

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
      <MobileCrumb />

      {/* 1) saldo */}
      <AccountBalance balance={balance} loading={loading} />

      {/* 2) acciones */}
      <DashboardActions />

      {/* 3) actividad + buscador */}
      <ActivitySection
        loading={loading}
        transactions={transactions}
        //accountId={accountId ?? 0}
        showActivityPage={false}
      />
    </main>
  );
}

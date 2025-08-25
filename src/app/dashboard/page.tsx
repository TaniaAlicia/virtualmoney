"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import BaseLayout from "@/components/generals/BaseLayout";
import AccountBalance from "@/components/dashboard/AccountBalance";
import DashboardActions from "@/components/dashboard/DashboardActions";
import ActivitySection from "@/components/dashboard/ActivitySection";
import { usePathname } from "next/navigation";
// arriba del archivo
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAccount } from "@/services/accountService";
import { getAllTransactions } from "@/services/transactionService";
import type { TransactionType } from "@/types/transaction";

export default function DashboardPage() {
  // dentro de DashboardPage()
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useAuthRedirect();

  const pathname = usePathname();

  const crumbs = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Actividad", path: "/dashboard/activity" },
    { label: "Tu perfil", path: "/dashboard/profile" },
    { label: "Cargar dinero", path: "/dashboard/add-money" },
    { label: "Pagar servicios", path: "/dashboard/payments" },
    { label: "Tarjetas", path: "/dashboard/cards" },
  ];

  const currentCrumb =
    crumbs
      .filter((c) => pathname === c.path || pathname.startsWith(c.path + "/"))
      .sort((a, b) => b.path.length - a.path.length)[0] || crumbs[0];

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = Cookies.get("token") ?? "";
        if (!token) throw new Error("No auth token");

        // 1) Cuenta
        const acc = await getAccount(); // <-- header Authorization: token (sin Bearer)
        if (!mounted) return;
        setBalance(acc.balance ?? 0);
        setAccountId(acc.id);

        // 2) Transacciones
        const tx = await getAllTransactions(acc.id, token);
        if (!mounted) return;
        setTransactions(tx);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <BaseLayout variant="dashboard">
      <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
        {/* Breadcrumb móvil */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Flecha → con línea (NEGRA) */}
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

          <p className="!text-dark1 text-lg font-medium underline underline-offset-2">
            {currentCrumb.label}
          </p>
        </div>

        {/* 1) saldo */}
        <AccountBalance balance={balance} loading={loading} />

        {/* 2) acciones */}
        <DashboardActions />

        {/* 3) actividad + buscador */}
        <ActivitySection
          loading={loading}
          transactions={transactions}
          //accountId={accountId ?? 0}
        />
      </main>
    </BaseLayout>
  );
}

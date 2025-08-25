"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import BaseLayout from "@/components/generals/BaseLayout";
import AccountBalance from "@/components/dashboard/AccountBalance";
import DashboardActions from "@/components/dashboard/DashboardActions";
import ActivitySection from "@/components/dashboard/ActivitySection";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  useAuthRedirect();

  const pathname = usePathname();

  const crumbs = [
    { label: "Inicio",           path: "/dashboard" },
    { label: "Actividad",        path: "/dashboard/activity" },
    { label: "Tu perfil",        path: "/dashboard/profile" },
    { label: "Cargar dinero",    path: "/dashboard/deposit" },
    { label: "Pagar servicios",  path: "/dashboard/payments" },
    { label: "Tarjetas",         path: "/dashboard/cards" },
  ];

  const currentCrumb =
    crumbs
      .filter(c => pathname === c.path || pathname.startsWith(c.path + "/"))
      .sort((a, b) => b.path.length - a.path.length)[0] || crumbs[0];

  return (
    <BaseLayout variant="dashboard">
      <main className="text-dark max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3">
        {/* Breadcrumb móvil */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Flecha → con línea (NEGRA) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-dark h-8 w-8 flex-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h14m0 0l-4-4m4 4l-4 4" />
          </svg>

          <p className="!text-dark1 text-lg font-medium underline underline-offset-2">
            {currentCrumb.label}
          </p>
        </div>

        {/* 1) saldo */}
        <AccountBalance />

        {/* 2) acciones */}
        <DashboardActions />

        {/* 3) actividad + buscador */}
        <ActivitySection />
      </main>
    </BaseLayout>
  );
}

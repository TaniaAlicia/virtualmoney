"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import BaseLayout from "@/components/generals/BaseLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  useAuthRedirect();

  const pathname = usePathname();

  const crumbs = [
    { label: "Inicio", path: "/dashboard" },
    { label: "Actividad", path: "/dashboard/activity" },
    { label: "Tu perfil", path: "/dashboard/profile" },
    { label: "Cargar dinero", path: "/dashboard/deposit" }, // (usa tu ruta real)
    { label: "Pagar servicios", path: "/dashboard/payments" }, // (usa tu ruta real)
    { label: "Tarjetas", path: "/dashboard/cards" },
  ];

  // match más específico (prefijo más largo)
  const currentCrumb =
    crumbs
      .filter((c) => pathname === c.path || pathname.startsWith(c.path + "/"))
      .sort((a, b) => b.path.length - a.path.length)[0] || crumbs[0];

  return (
    <BaseLayout variant="dashboard">
      {/* Solo contenido, SIN SidebarDashboard aquí */}
      <main className="text-dark max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3">
        {/* Breadcrumb móvil */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Flecha → con línea (NEGRA) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-dark h-6 w-6 flex-none"
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

        {/* Card de saldo */}
        <div className="max-w-8xl flex min-h-[200px] flex-col gap-4 rounded-xl bg-dark px-6 py-8 text-white shadow">
          <div className="flex items-start justify-between">
            {/* Título + monto, corridos abajo/derecha */}
            <div className="ml-6 mt-14">
              <p className="ml-3 text-sm/5 opacity-90">Dinero disponible:</p>

              {/* Óvalo */}
              <div className="mt-3 inline-flex items-baseline gap-2 rounded-full border-2 border-green px-4 py-1.5">
                <span className="text-3xl font-bold">$</span>
                <span className="text-4xl font-extrabold tracking-tight">
                  0,00
                </span>
              </div>
            </div>

            {/* Links (sin subrayado, bold en hover) */}
            <div className="w-full flex flex-row gap-4 justify-end">
              <Link
                href="/dashboard/cards"
                className="text-white/90 underline decoration-white/40 underline-offset-2 transition hover:font-bold hover:decoration-white"
              >
                Ver tarjetas
              </Link>
              <Link
                href="/dashboard/cvu"
                className="text-white/90 underline decoration-white/40 underline-offset-2 transition hover:font-bold hover:decoration-white"
              >
                Ver CVU
              </Link>
            </div>
          </div>
        </div>

        {/* Botones grandes */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/dashboard/deposit"
            className="rounded-xl bg-green py-6 text-center text-xl font-bold text-black shadow transition hover:brightness-95"
          >
            Cargar dinero
          </Link>
          <Link
            href="/dashboard/payments"
            className="rounded-xl bg-green py-6 text-center text-xl font-bold text-black shadow transition hover:brightness-95"
          >
            Pagar servicios
          </Link>
        </div>

        {/* Buscar en tu actividad (card) */}
        <div className="rounded-xl bg-light px-4 py-3 shadow">
          <div className="flex items-center gap-3">
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

            {/* Input sin borde interno ni línea */}
            <input
              type="text"
              placeholder="Buscar en tu actividad"
              className="w-full border-none bg-transparent text-dark2 placeholder-dark2 placeholder-opacity-50 outline-none"
            />
          </div>
        </div>

        {/* Tu actividad (card) */}
        <div className="rounded-xl bg-light p-5 shadow">
          {/* Título visible con tu color oscuro secundario */}
          <h2 className="text-base font-semibold text-dark2">Tu actividad</h2>

          {/* Línea divisoria con tu gris */}
          <div className="mt-3 h-px w-full bg-[#D9D9D9]"></div>

          {/* Contenido vacío */}
          <p className="mt-4 text-sm text-dark/70">
            No hay movimientos en tu cuenta.
          </p>

          {/* Footer: link + flecha */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/dashboard/activity"
              className="text-sm font-semibold text-green underline decoration-green/60 underline-offset-2 hover:decoration-green"
            >
              Ver toda tu actividad →
            </Link>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-dark/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}

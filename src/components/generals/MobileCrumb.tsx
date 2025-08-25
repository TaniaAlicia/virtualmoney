// components/generals/MobileCrumb.tsx
"use client";

import { usePathname } from "next/navigation";

const crumbs = [
  { label: "Inicio", path: "/dashboard" },
  { label: "Actividad", path: "/dashboard/activity" },
  { label: "Tu perfil", path: "/dashboard/profile" },
  { label: "Cargar dinero", path: "/dashboard/add-money" },
  { label: "Pagar servicios", path: "/dashboard/payments" },
  { label: "Tarjetas", path: "/dashboard/cards" },
];

export default function MobileCrumb() {
  const pathname = usePathname();

  const currentCrumb =
    crumbs
      .filter((c) => pathname === c.path || pathname.startsWith(c.path + "/"))
      .sort((a, b) => b.path.length - a.path.length)[0] || crumbs[0];

  return (
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h14m0 0l-4-4m4 4l-4 4" />
      </svg>

      <p className="!text-dark1 text-lg font-medium underline underline-offset-2">
        {currentCrumb.label}
      </p>
    </div>
  );
}

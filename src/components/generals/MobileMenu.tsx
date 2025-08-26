// components/generals/MobileMenu.tsx
"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { logout } from "@/services/authService";

type Props = { open: boolean; onClose: () => void };

const items = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/activity", label: "Actividad" },
  { href: "/dashboard/profile", label: "Tu perfil" },
  { href: "/dashboard/add-money", label: "Cargar dinero" },
  { href: "/dashboard/payments", label: "Pagar servicios" },
  { href: "/dashboard/cards", label: "Tarjetas" },
];

export default function MobileMenu({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, open]);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  const node = (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-200",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        className={clsx(
          // posición y dimensiones
          "fixed inset-y-0 right-0 z-[9999] h-screen w-[82vw] max-w-[360px]",
          // estilos
          "bg-green text-black shadow-xl",
          // animación
          "transition-transform duration-300 ease-out",
          // 👇 translate exclusivo (o entra o está fuera)
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-dark px-5 py-4 text-white">
          <div className="flex flex-col leading-5">
            <span className="text-base font-bold">Hola,</span>
            <span className="text-base font-bold">Tania Rodriguez</span>
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="p-1"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4 px-6 py-6">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={clsx(
                "text-lg transition-colors",
                isActive(it.href)
                  ? "font-bold text-black"
                  : "font-medium text-black/80 hover:text-black",
              )}
            >
              {it.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-2 text-left text-lg font-medium text-black/60 hover:text-black"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>
    </>
  );

  // Evita hidratar en SSR
  if (!mounted) return null;
  return createPortal(node, document.body);
}

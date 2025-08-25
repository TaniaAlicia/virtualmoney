"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import clsx from "clsx";


const items = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/activity", label: "Actividad" },
  { href: "/dashboard/profile", label: "Tu perfil" },
  { href: "/dashboard/add-money", label: "Cargar dinero" },
  { href: "/dashboard/payments", label: "Pagar Servicios" },
  { href: "/dashboard/cards", label: "Tarjetas" },
];

export default function SidebarDashboard() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
  // Para "Inicio" (ruta base) sólo activo en coincidencia exacta
  if (href === "/dashboard") return pathname === "/dashboard";
  // Para el resto, exacto o con subrutas
  return pathname === href || pathname.startsWith(href + "/");
};

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLinkClick = () => {
    
  };

  return (
    <aside className="hidden md:block w-[200px] bg-green text-black min-h-screen p-8">
      <nav className="flex flex-col gap-3">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            //aria-current={isActive(it.href) ? "page" : undefined}
            onClick={handleLinkClick}
            className={clsx(
              "block text-[15px] leading-6 transition-colors duration-150",
              isActive(it.href)
                ? "font-bold md:font-extrabold text-black"
                : "font-normal md:font-semibold text-black/80 hover:text-black hover:font-bold md:hover:font-extrabold"
            )}
          >
            {it.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className=" text-left text-[15px] font-normal md:font-semibold text-black/50 hover:text-black hover:font-bold md:hover:font-extrabold transition-colors duration-150"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}

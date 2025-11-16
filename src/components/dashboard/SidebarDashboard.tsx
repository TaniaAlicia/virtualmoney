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
    if (href === "/dashboard") return pathname === "/dashboard";

    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLinkClick = () => {};

  return (
    <aside className="hidden min-h-screen w-[270px] bg-green p-8 text-black md:block">
      <nav className="flex flex-col gap-3">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            onClick={handleLinkClick}
            className={clsx(
              "block text-[15px] leading-6 transition-colors duration-150",
              isActive(it.href)
                ? "font-bold text-black md:font-extrabold"
                : "font-normal text-black/80 hover:font-bold hover:text-black md:font-semibold md:hover:font-extrabold",
            )}
          >
            {it.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className=" text-left text-[15px] font-normal text-black/50 transition-colors duration-150 hover:font-bold hover:text-black md:font-semibold md:hover:font-extrabold"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}

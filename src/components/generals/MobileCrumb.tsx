"use client";

import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  const currentCrumb =
    crumbs
      .filter((c) => pathname === c.path || pathname.startsWith(c.path + "/"))
      .sort((a, b) => b.path.length - a.path.length)[0] || crumbs[0];

  const handleClick = () => {
    router.push(currentCrumb.path);
  };

  return (
    <div
      className="flex items-center gap-2 md:hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 flex-none text-dark dark:text-light"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 12H6m0 0l4-4m-4 4l4 4"
        />
      </svg>

      <p className="text-dark dark:text-light text-lg font-medium underline underline-offset-2">
        {currentCrumb.label}
      </p>
    </div>
  );
}

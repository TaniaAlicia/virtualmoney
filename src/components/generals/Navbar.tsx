"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import UserGreeting from "./UserGreeting";

type NavbarProps = {
  variant?: "landing" | "login" | "register" | "dashboard";
};

export default function Navbar({ variant = "landing" }: NavbarProps) {
  const logoSrc =
    variant === "login" || variant === "register"
      ? "/images/Logo01Dark.png"
      : "/images/Logo01.png";

  return (
    <nav
      className={clsx(
        "flex h-14 items-center justify-between px-4",
        variant === "landing" && "bg-dark",
        (variant === "login" || variant === "register") && "bg-green",
        variant === "dashboard" && "bg-dark text-white",
      )}
    >
      <div className="flex items-center">
        <Image
          src={logoSrc}
          alt="Logo Digital Money"
          width={40}
          height={40}
          priority
        />
      </div>

      {/*SECCIÓN PARA LANDING */}
      {variant === "landing" && (
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="rounded border border-green px-3 py-1 text-sm text-green transition hover:bg-green hover:text-black"
          >
            Ingresar
          </Link>
          <Link
            href="/register"
            className="rounded bg-green px-3 py-1 text-sm font-bold text-black transition hover:bg-lime-300"
          >
            Crear cuenta
          </Link>
        </div>
      )}

      {/* Dashboard: saludo + avatar */}
      {variant === 'dashboard' && <UserGreeting />}

    </nav>
  );
}

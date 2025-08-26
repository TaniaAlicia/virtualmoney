"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import UserGreeting from "./UserGreeting";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

type NavbarProps = {
  variant?: "landing" | "login" | "register" | "dashboard";
};

export default function Navbar({ variant = "landing" }: NavbarProps) {
 const [menuOpen, setMenuOpen] = useState(false);

  const logoSrc =
    variant === "login" || variant === "register"
      ? "/images/Logo01Dark.png"
      : "/images/Logo01.png";

  return (
    <>
    <nav
      className={clsx(
        "w-full flex h-12 items-center justify-between px-4 ",
        variant === "landing" && "bg-dark",
        (variant === "login" || variant === "register") && "bg-green",
        variant === "dashboard" && "bg-dark text-white",
      )}
    >
      <div className="flex items-center">
        <Link href="/" aria-label="Ir a inicio">
        <Image
          src={logoSrc}
          alt="Logo Digital Money"
          width={60}
          height={60}
          priority
        />
        </Link>
      </div>

      {/*SECCIÓN PARA LANDING */}
      {variant === "landing" && (
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="rounded border border-green px-3 py-1 text-sm font-bold text-green transition hover:bg-green hover:text-black"
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
      {variant === "dashboard" && (
  <>
    {/* Desktop: saludo completo */}
    <div className="hidden md:block">
      <UserGreeting compact={false} />
    </div>

    {/* Mobile: solo avatar + hamburguesa */}
    <div className="md:hidden flex items-center">
      <UserGreeting compact />

      <button
        type="button"
        aria-label="Abrir menú"
        onClick={() => setMenuOpen(true)}  
        className="p-2 -mr-1 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </>
)}
    </nav>
     {/* Drawer mobile */}
      {variant === "dashboard" && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
      </>
  );
}

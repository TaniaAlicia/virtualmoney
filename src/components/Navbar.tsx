'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  variant?: 'landing' | 'login' | 'register';
};

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  // Elegimos logo según la variante
  const logoSrc =
    variant === 'login' || variant === 'register'
      ? '/images/Logo01Dark.png'
      : '/images/Logo01.png';

  return (
    <nav
      className={clsx(
        'h-14 flex items-center justify-between px-4',
        variant === 'landing' && 'bg-dark',
        (variant === 'login' || variant === 'register') && 'bg-green'
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

      {variant === 'landing' && (
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="text-sm px-3 py-1 border border-green text-green rounded hover:bg-green hover:text-black transition"
          >
            Ingresar
          </Link>
          <Link
            href="/register"
            className="bg-green text-black px-3 py-1 text-sm rounded hover:bg-lime-300 font-bold transition"
          >
            Crear cuenta
          </Link>
        </div>
      )}

      {variant === 'register' && (
        <Link
          href="/login"
          className="ml-auto text-sm px-3 py-1 bg-dark text-white rounded hover:bg-black transition"
        >
          Iniciar sesión
        </Link>
      )}
    </nav>
  );
}

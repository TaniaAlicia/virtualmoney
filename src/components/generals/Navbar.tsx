import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  variant?: 'landing' | 'login' | 'register' | 'dashboard';
};

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const logoSrc =
    variant === 'login' || variant === 'register'
      ? '/images/Logo01Dark.png'
      : '/images/Logo01.png';

  return (
    <nav
      className={clsx(
        'h-14 flex items-center justify-between px-4',
        variant === 'landing' && 'bg-dark',
        (variant === 'login' || variant === 'register') && 'bg-green',
        variant === 'dashboard' && 'bg-dark text-white'
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

      {/* Dashboard: saludo + avatar */}
      {variant === 'dashboard' && (
        <div className="flex items-center space-x-2">
          <span className="text-sm">Hola, Tania Rodriguez</span>
          <div className="w-8 h-8 rounded-full bg-green text-black font-bold flex items-center justify-center">
            TR
          </div>
        </div>
      )}
    </nav>
  );
}

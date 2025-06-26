'use client';

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="h-16 bg-dark px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/images/Logo01.png"
          alt="Logo Digital Money"
          width={40}
          height={40}
          priority
        />
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-sm px-3 py-1 border border-green text-green rounded hover:bg-green hover:text-black transition">
          Ingresar
        </button>
        <button className="bg-green text-black px-3 py-1 text-sm rounded hover:bg-lime-300 font-bold transition">
          Crear cuenta
        </button>
      </div>
    </nav>
  );
}

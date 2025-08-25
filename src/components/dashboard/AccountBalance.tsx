"use client";

import Link from "next/link";

export default function AccountBalance() {
  return (
    <div className="max-w-8xl flex min-h-[200px] flex-col gap-4 rounded-xl bg-dark px-6 py-8 text-white shadow">
      <div className="flex items-start justify-between">
        {/* Título + monto */}
        <div className="ml-6 mt-14">
          <p className="ml-3 text-sm/5 opacity-90">Dinero disponible:</p>

          {/* Óvalo */}
          <div className="mt-3 inline-flex items-baseline gap-2 rounded-full border-2 border-green px-4 py-1.5">
            <span className="text-3xl font-bold">$</span>
            <span className="text-4xl font-extrabold tracking-tight">0,00</span>
          </div>
        </div>

        {/* Links */}
        <div className="space-x-6">
          <Link
            href="/dashboard/cards"
            className="text-white/90 underline decoration-white/40 underline-offset-2 transition hover:font-bold hover:decoration-white"
          >
            Ver tarjetas
          </Link>
          <Link
            href="/dashboard/cvu"
            className="text-white/90 underline decoration-white/40 underline-offset-2 transition hover:font-bold hover:decoration-white"
          >
            Ver CVU
          </Link>
        </div>
      </div>
    </div>
  );
}

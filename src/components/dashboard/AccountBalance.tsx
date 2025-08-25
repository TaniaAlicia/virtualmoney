"use client";

import Link from "next/link";

interface AccountBalanceProps {
  balance: number;
  loading: boolean;
}

function formatARS(value: number) {
  // "$ 1.234,56"
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function AccountBalance({ balance, loading }: AccountBalanceProps) {
  
  

  return (
    <div className="max-w-8xl flex min-h-[200px] flex-col gap-4 rounded-xl bg-dark px-6 py-8 text-white shadow">
      <div className="flex items-start justify-between">
        {/* Título + monto */}
        <div className="ml-6 mt-14">
          <p className="ml-3 text-sm/5 opacity-90">Dinero disponible:</p>

          {/* Óvalo */}
          <div className="mt-3 inline-flex items-baseline gap-2 rounded-full border-2 border-green px-4 py-1.5">
            <span className="text-3xl font-bold">$</span>
            <span className="text-4xl font-extrabold tracking-tight">
              {loading ? "—" : formatARS(balance ?? 0)}
            </span>
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
            href="/dashboard/profile"
            className="text-white/90 underline decoration-white/40 underline-offset-2 transition hover:font-bold hover:decoration-white"
          >
            Ver CVU
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAccount } from "@/services/accountService";

function formatARS(value: number) {
  // "$ 1.234,56"
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
export default function AccountBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const account = await getAccount(); // <-- ya arma el header adentro
        if (mounted) setBalance(account.balance ?? 0);
      } catch (e: any) {
        if (mounted) setErr(e?.message || "No pudimos obtener el saldo");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
              {loading ? "—" : err ? "0,00" : formatARS(balance ?? 0)}
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

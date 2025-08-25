"use client";

import Link from "next/link";

export default function DashboardActions() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Link
        href="/dashboard/deposit"
        className="rounded-xl bg-green py-6 text-center text-xl font-bold text-black shadow transition hover:brightness-95"
      >
        Cargar dinero
      </Link>
      <Link
        href="/dashboard/payments"
        className="rounded-xl bg-green py-6 text-center text-xl font-bold text-black shadow transition hover:brightness-95"
      >
        Pagar servicios
      </Link>
    </div>
  );
}

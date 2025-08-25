"use client";

import Link from "next/link";

export default function ActivitySection() {
  return (
    <>
      {/* Buscar en tu actividad */}
      <div className="rounded-xl bg-light px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          {/* Lupa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-dark/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>

          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="w-full border-none bg-transparent text-dark2 placeholder-dark2/70 outline-none"
          />
        </div>
      </div>

      {/* Tu actividad */}
      <div className="rounded-xl bg-light p-5 shadow">
        <h2 className="text-base font-semibold text-dark2">Tu actividad</h2>
        <div className="mt-3 h-px w-full bg-[#D9D9D9]"></div>

        <p className="mt-4 text-sm text-dark/70">
          No hay movimientos en tu cuenta.
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/dashboard/activity"
            className="text-sm font-semibold text-green underline decoration-green/60 underline-offset-2 hover:decoration-green"
          >
            Ver toda tu actividad →
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-dark/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </>
  );
}

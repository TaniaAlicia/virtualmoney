"use client";

import Link from "next/link";

export default function PaymentsCTA() {
  return (
    <Link
      href="/dashboard/add-money"
      className="w-full h-[64px] md:h-[116px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-green p-5 md:py-10 md:px-8 xl:px-10 flex flex-row justify-between items-center"
    >
      <span className="text-dark1 text-base md:text-xl font-bold leading-normal">
        Gestiona los medios de pago
      </span>
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 md:w-10 md:h-10"
        fill="none"
        stroke="#201F22"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h14m0 0l-4-4m4 4l-4 4" />
      </svg>
    </Link>
  );
}

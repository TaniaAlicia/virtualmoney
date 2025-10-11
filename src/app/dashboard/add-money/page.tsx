"use client";

import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import CardIcon from "@/components/icons/CardIcon";
import UserIcon from "@/components/icons/UserIcon";
import MobileCrumb from "@/components/generals/MobileCrumb";

export default function AddMoneyPage() {
  return (
    <section className="flex flex-col gap-6 p-6 md:p-10">
      <MobileCrumb />
      {/* Tarjeta 1: Transferencia bancaria */}
      <Link
        href="/dashboard/add-money/bank"
        className="flex justify-between items-center bg-dark rounded-xl shadow-md px-6 py-10 md:py-12 min-h-38 md:min-h-45 transition hover:brightness-110"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <UserIcon />
          <p className="text-light font-bold text-lg md:text-xl">
            Transferencia bancaria
          </p>
        </div>
        <ArrowIcon className="w-5 h-5 text-green" />
      </Link>

      {/* Tarjeta 2: Seleccionar tarjeta */}
      <Link
        href="/dashboard/add-money/card"
        className="flex justify-between items-center bg-dark rounded-xl shadow-md px-6 py-10 md:py-12 min-h-38 md:min-h-45 transition hover:brightness-110"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <CardIcon />
          <p className="text-light font-bold text-lg md:text-xl">
            Seleccionar tarjeta
          </p>
        </div>
        <ArrowIcon className="w-5 h-5 text-green" />
      </Link>
    </section>
  );
}

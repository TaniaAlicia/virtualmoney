"use client";

import Link from "next/link";

type Props = { href?: string };

export default function AddCardBanner({ href = "/dashboard/cards/add-card" }: Props) {
  return (
    <section className="w-full flex flex-col bg-dark px-6 py-4 gap-7 min-h-[147px] md:justify-center md:px-8 md:py-10 xl:px-12 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <h3 className="text-gray1 md:hidden xl:block font-bold">
        Agregá tu tarjeta de débito o crédito
      </h3>

      <Link href={href} className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-5 items-center">
          <span className="flex justify-center items-center">
            {/* PlusIcon */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#C1FD35" />
              <path d="M12 7v10M7 12h10" stroke="#C1FD35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <p className="text-xl text-green text-start font-bold">Nueva tarjeta</p>
        </div>

        <span className="flex justify-end items-center">
          {/* ArrowIcon */}
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="#C1FD35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </section>
  );
}

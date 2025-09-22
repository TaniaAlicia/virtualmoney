"use client";

import Link from "next/link";

type Props = { href?: string };

export default function AddCardBanner({
  href = "/dashboard/cards/add-card",
}: Props) {
  return (
    <section className="flex min-h-[147px] w-full flex-col gap-7 rounded-[10px] bg-dark px-6 py-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:justify-center md:px-8 md:py-10 xl:px-12">
      <h3 className="font-bold text-gray1 md:hidden xl:block">
        Agregá tu tarjeta de débito o crédito
      </h3>

      <Link
        href={href}
        className="flex w-full flex-row items-center justify-between"
      >
        <div className="flex flex-row items-center gap-5">
          <span className="flex items-center justify-center">
            {/* PlusIcon */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#C1FD35" />
              <path
                d="M12 7v10M7 12h10"
                stroke="#C1FD35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="text-start text-xl font-bold text-green">
            Nueva tarjeta
          </p>
        </div>

        <span className="flex items-center justify-end">
          {/* ArrowIcon */}
          <svg
            width="28" 
            height="28"
            className="shrink-0" 
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 12h14M13 5l7 7-7 7"
              stroke="#C1FD35"
              strokeWidth="2.2" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </section>
  );
}

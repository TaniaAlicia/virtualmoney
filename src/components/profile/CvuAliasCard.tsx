"use client";

import CopyToClipboard from "@/components/generals/CopyToClipboard";

type Props = {
  cvu: string;
  alias?: string;
};

export default function CvUAliasCard({ cvu, alias }: Props) {
  return (
    <section className="rounded-[10px] bg-dark text-white shadow p-5 md:py-6 md:px-8 xl:px-10">
      <p className="text-sm md:text-base text-white/80 mb-4">
        Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta
      </p>

      {/* CVU */}
      <div className="w-full flex flex-row justify-between items-start md:items-center md:pb-4 xl:py-2">
        <div className="w-full flex flex-col items-start">
          <span className="text-green text-xl font-bold leading-normal">CVU</span>
          <span className="text-gray1 text-base leading-[18.83px] break-all">
            {cvu}
          </span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <CopyToClipboard text={cvu} />
        </div>
      </div>

      {/* Alias */}
      <div className="w-full flex flex-row justify-between items-start md:items-center md:pt-2 xl:pt-3">
        <div className="w-full flex flex-col items-start">
          <span className="text-green text-xl font-bold leading-normal">ALIAS</span>
          <span className="text-gray1 text-base leading-[18.83px] break-all">
            {alias || "—"}
          </span>
        </div>
        {alias ? (
          <div className="w-8 h-8 flex items-center justify-center">
            <CopyToClipboard text={alias} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

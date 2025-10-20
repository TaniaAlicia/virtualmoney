"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import clsx from "clsx";
import MobileCrumb from "@/components/generals/MobileCrumb";

const ACCOUNT = 91010109418;

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<string>("");

  const checkAddNumberAccount = () => {
    if (!account || account.trim() === "") {
      toast.error("Por favor ingrese el número de cliente");
      return;
    }
    if (/\s/.test(account)) {
      toast.error("El número no debe contener espacios");
      return;
    }
    if (!/^\d{11}$/.test(account)) {
      toast.error("El número debe tener exactamente 11 dígitos numéricos.");
      toast.error("Agregá ceros adelante si tenés menos.");
      return;
    }
    if (account.startsWith("2")) {
      toast.error("El número no debe comenzar con '2'");
      return;
    }

    const numberAccount = Number(account);
    if (numberAccount !== ACCOUNT) {
      router.push("/dashboard/pay-services/account/error");
    } else {
      router.push("/dashboard/pay-services/account/checked");
    }
  };

  return (
    <>
      <MobileCrumb />

      <section className="flex flex-col gap-5">
        {/* 🟩 Caja principal */}
        <div className=" mt-4 md:mt-0flex flex-col gap-4 rounded-[10px] bg-dark px-6 pb-14 pt-6 shadow-md md:px-10 md:py-10 xl:px-12 xl:py-10">
          <h2 className="mb-2 text-xl font-bold text-green md:text-2xl">
            Número de cuenta sin el primer 2
          </h2>

          {/* 🔢 Campo de cuenta */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 xl:gap-4"
          >
            <input
              name="account"
              type="text"
              value={account}
              maxLength={11}
              minLength={11}
              placeholder="Debes escribir este número de cuenta: 91010109418"
              onChange={(e) => setAccount(e.target.value)}
              className="text-dark h-[50px] w-full rounded-[10px] p-4 text-left shadow-[0_4px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-green md:h-[64px] xl:w-[480px]"
            />
            <p className="hidden px-1 text-sm text-white/80 md:block">
              Son 11 números sin espacios, sin el “2” inicial. Agregá ceros
              adelante si tenés menos.
            </p>
          </form>

          {/* 🖥️ Botón en desktop (dentro de la caja) */}
          <div className="mt-6 hidden justify-end md:flex">
            <button
              onClick={checkAddNumberAccount}
              disabled={account.length !== 11}
              aria-disabled={account.length !== 11}
              className={clsx(
                "rounded-[10px] px-10 py-4 font-bold shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-colors",
                "bg-green text-dark", // <-- siempre verde
                account.length === 11
                  ? "hover:brightness-95 md:w-full lg:w-auto"
                  : "cursor-not-allowed opacity-60", // <-- deshabilitado, pero verde
              )}
            >
              Continuar
            </button>
          </div>
        </div>

        {/* 📱 Botón en mobile (fuera de la caja) */}
        <div className="flex w-full justify-end md:hidden">
          <button
            onClick={checkAddNumberAccount}
            disabled={account.length !== 11}
            aria-disabled={account.length !== 11}
            className={clsx(
              "flex h-[50px] w-[165px] items-center justify-center rounded-[10px] font-bold shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-colors",
              "bg-green text-dark", // <-- siempre verde
              account.length === 11
                ? "hover:brightness-95"
                : "cursor-not-allowed opacity-60", // <-- deshabilitado, pero verde
            )}
          >
            Continuar
          </button>
        </div>
      </section>
    </>
  );
}

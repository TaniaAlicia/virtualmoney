"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import clsx from "clsx";

import { useSetAmount } from "@/context/moneyContext";
import CustomToaster from "@/components/generals/CustomToaster";
import MobileCrumb from "@/components/generals/MobileCrumb";

export default function AmountPage() {
  const router = useRouter();
  const { amount, setAmount } = useSetAmount();
  const [loading, setLoading] = useState(false);

  // 🔁 limpiar el valor al montar la página
  useEffect(() => {
    setAmount(0);
  }, [setAmount]);

  // ✋ Evita caracteres inválidos
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalid = ["e", "E", "+", "-"];
    if (invalid.includes(e.key)) e.preventDefault();
  };

  // ✋ Evita pegar contenido no numérico
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text");
    if (!/^\d*[.,]?\d*$/.test(paste)) e.preventDefault();
  };

  // ✅ Permite decimales reales
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(",", ".");
    // Solo acepta dígitos y un punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(parseFloat(value) || 0);
    }
  };

  // 🚀 Continuar
  const handleContinue = () => {
    if (!amount || amount <= 0) {
      toast.error("Ingrese un importe mayor a $0", {
        style: {
          background: "#ffebeb",
          color: "#d60000",
          fontWeight: 600,
          border: "1px solid #ffbaba",
        },
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard/add-money/card/amount/checked");
      setLoading(false);
    }, 700);
  };

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-5 bg-gray1 px-6 pb-6 pt-0 text-dark">
      <CustomToaster />
      <MobileCrumb />

      {/* Caja principal */}
      <section className="flex flex-col gap-5 rounded-[10px] bg-dark p-6 shadow-sm md:px-12 md:py-10">
        <h2 className="text-lg font-bold text-green md:text-2xl">
          ¿Cuánto querés ingresar a la cuenta?
        </h2>

        {/* Campo de monto */}
        <div className="flex w-full flex-col gap-4 md:max-w-md">
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="$0.00"
            value={amount === 0 ? "" : amount}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-gray2 bg-white px-4 py-3 text-lg text-dark outline-none focus:border-green"
          />
        </div>
      </section>

      {/* Botón continuar (mobile) */}
      <div className="mb-5 flex h-[50px] w-full justify-end md:hidden">
        <button
          onClick={handleContinue}
          className={clsx(
            "w-[165px] rounded-[10px] p-3 font-bold text-dark shadow transition",
            "bg-gray2 hover:brightness-110"
          )}
        >
          {loading ? "Procesando..." : "Continuar"}
        </button>
      </div>

      {/* Botón continuar (desktop) */}
      <div className="hidden md:mb-5 md:mt-2 md:flex md:justify-end">
        <button
          onClick={handleContinue}
          className={clsx(
            "rounded-[10px] p-5 font-bold text-dark shadow transition md:w-[233px]",
            "bg-gray2 hover:brightness-110"
          )}
        >
          {loading ? "Procesando..." : "Continuar"}
        </button>
      </div>
    </main>
  );
}

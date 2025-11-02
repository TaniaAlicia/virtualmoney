"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/transactionContext";
import CustomToaster from "@/components/generals/CustomToaster";
import MobileCrumb from "@/components/generals/MobileCrumb";
import CheckIcon from "@/components/icons/CheckIcon";
import { getAccount } from "@/services/accountService";
import Cookies from "js-cookie";
import { AccountType } from "@/types/account";

export default function AddMoneySuccessPage() {
  const router = useRouter();
  const { transaction } = useTransaction();

  const [accountData, setAccountData] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧾 Traemos los datos de la cuenta para mostrar el CVU real
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const account = await getAccount();
        setAccountData(account);
      } catch (error) {
        console.error("Error al obtener la cuenta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  // Si no hay transacción, redirigir al dashboard
  useEffect(() => {
    if (!transaction && !loading) router.push("/dashboard");
  }, [transaction, loading, router]);

  if (loading) {
    return (
      <main className="max-w-8xl mx-auto flex-1 bg-gray1 px-6 py-10 text-center text-dark">
        Cargando datos de la cuenta...
      </main>
    );
  }

  if (!transaction) return null;

  // ✅ Formateos
  const transactionDate =
    transaction.dated || transaction.createdAt || new Date().toISOString();
  const formattedDate = new Date(transactionDate).toLocaleString("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const formattedAmount = Math.abs(transaction.amount).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const handleGoHome = () => router.push("/dashboard");
  const handleDownload = () => alert("📄 Descargando comprobante (simulado)");

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-5 bg-gray1 px-6 pb-8 pt-0 text-dark">
      <CustomToaster />
      <MobileCrumb />

      {/* Sección principal verde */}
      <section className="flex flex-col items-center justify-center gap-4 rounded-[10px] bg-green p-6 shadow">
        <CheckIcon className="w-14 fill-dark" />
        <h2 className="text-dark text-xl md:text-2xl font-bold text-center">
          Ya cargamos el dinero en tu cuenta
        </h2>
      </section>

      {/* Detalle de la transacción */}
      <section className="flex flex-col gap-5 rounded-[10px] bg-dark p-6 shadow-sm md:px-12 md:py-10">
        <div className="text-light">
          <p className="text-xs opacity-70 mb-1">{formattedDate}</p>
          <p className="text-green font-bold text-2xl">{formattedAmount}</p>

          <div className="mt-5">
            <p className="text-sm opacity-70">Para</p>
            <p className="font-semibold text-green">Cuenta propia</p>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            <p>Digital Money House</p>
            <p className="text-xs">CVU {accountData?.cvu ?? "—"}</p>
          </div>
        </div>
      </section>

      {/* Botones */}
      <div className="flex flex-col md:flex-row md:justify-end gap-4">
        <button
          onClick={handleGoHome}
          className="w-full md:w-[233px] rounded-[10px] bg-gray2 py-3 font-bold text-dark shadow hover:brightness-105"
        >
          Ir al inicio
        </button>
        <button
          onClick={handleDownload}
          className="w-full md:w-[233px] rounded-[10px] bg-green py-3 font-bold text-dark shadow hover:brightness-110"
        >
          Descargar comprobante
        </button>
      </div>
    </main>
  );
}

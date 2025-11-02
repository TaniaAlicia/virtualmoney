"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useTransaction } from "@/context/transactionContext";
import { useSelectCard, useSelectService } from "@/context/moneyContext";
import { getServiceId } from "@/services/servicesService";
import { downloadServiceReceiptPDF } from "@/utils/downloadServiceReceiptPDF";

// helpers
function formatDated(fecha?: string | Date) {
  if (!fecha) return "";
  const d = new Date(fecha);
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  // ej.: "1 de noviembre de 2025, 15:40" -> "1 de noviembre de 2025 a las 15:40 hs."
  const base = new Intl.DateTimeFormat("es-AR", opts)
    .format(d)
    .replace("  ", " ");
  return base.replace(", ", " a las ") + " hs.";
}

function prettyBrand(b?: string | null) {
  if (!b) return null;
  const x = b.toLowerCase();
  if (x.includes("visa")) return "Visa";
  if (x.includes("master")) return "MasterCard";
  if (x.includes("amex") || x.includes("american")) return "American Express";
  if (x.includes("naranja")) return "Naranja";
  if (x.includes("cabal")) return "Cabal";
  return b.charAt(0).toUpperCase() + b.slice(1);
}

const currency = (n?: number) =>
  (n ?? 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" });

// ícono (negro)
const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1" />
    <path
      d="M8 12.5l3 3 5-6"
      stroke="black"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SuccessPage() {
  const router = useRouter();
  const { transaction } = useTransaction();
  const { brand, last4 } = useSelectCard();
  const { serviceId } = useSelectService();

  const [serviceName, setServiceName] = useState<string>("Servicio");
  const [serviceAmount, setServiceAmount] = useState<number | undefined>(
    undefined,
  );

  const brandLabel = prettyBrand(brand) ?? "Tarjeta";

  // Cargamos el detalle del servicio por si lo necesitamos (nombre / invoice_value)
  useEffect(() => {
    let active = true;
    (async () => {
      if (!serviceId) return;
      try {
        const token = Cookies.get("token") ?? "";
        const data = await getServiceId(String(serviceId), token);
        if (!active || !data) return;
        // data: { id, name, date, invoice_value? }
        if (data.name) setServiceName(data.name);
        if (typeof data.invoice_value === "number")
          setServiceAmount(data.invoice_value);
      } catch {
        // si falla, usamos lo que tengamos en transaction.description
      }
    })();
    return () => {
      active = false;
    };
  }, [serviceId]);

  // Fecha y montos finales que se mostrarán
  const dated = useMemo(
    () => formatDated(transaction?.dated ?? new Date()),
    [transaction?.dated],
  );

  const amountToShow = useMemo(() => {
    // Prioridad: monto de la transacción; si no, el del servicio; si no, 0
    const base =
      typeof transaction?.amount === "number"
        ? transaction?.amount
        : (serviceAmount ?? 0);
    // en los mocks de éxito de pago, el valor se muestra negativo
    return "- " + currency(base);
  }, [transaction?.amount, serviceAmount]);

  const finalServiceName =
    transaction?.description || serviceName || "Servicio";

  const maskedCard = last4
    ? `${brandLabel}************${last4}`
    : "Tarjeta no disponible";

  const handleDownload = () => {
    // mismo monto pero POSITIVO para el comprobante
    const amountAbs =
      typeof transaction?.amount === "number"
        ? Math.abs(transaction.amount)
        : Math.abs(serviceAmount ?? 0);

    // mismos datos que ya mostrás en pantalla
    /* const last4Safe =
      last4 ?? (cardId != null ? String(cardId).slice(-4) : "----"); */

    const cardMasked = `${brandLabel} ************${last4}`;

    downloadServiceReceiptPDF({
      amount: amountAbs,
      dated: transaction?.dated ? new Date(transaction.dated) : new Date(),
      serviceName: finalServiceName,
      cardMasked,
       operationType: "payService",
    });
  };

  return (
    <main className="flex flex-col gap-6">
      {/* Banner éxito */}
      <section className="flex flex-col items-center justify-center gap-3 rounded-[10px] bg-green py-5">
        <Check className="h-16 w-16" />
        <h1 className="text-center text-base font-bold text-black md:text-2xl">
          Ya realizaste tu pago
        </h1>
      </section>

      {/* Tarjeta detalle */}
      <section className="rounded-[10px] bg-dark p-6 text-light shadow md:p-8">
        <div className="mb-6 flex flex-col gap-1 md:mb-8">
          <p className="text-xs">{dated}</p>
          <p className="text-xl font-bold text-green">{amountToShow}</p>
        </div>

        <div className="mb-6 flex flex-col gap-1">
          <p className="text-sm">Para</p>
          <p className="text-xl font-bold text-green">{finalServiceName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm">Tarjeta</p>
          <p className="text-xs">{maskedCard}</p>
        </div>
      </section>

      {/* Botonera */}
      <div className="flex flex-col gap-4 md:flex-row-reverse md:items-stretch">
        {/* Verde – Descargar comprobante */}
        <button
          onClick={handleDownload}
          className="h-[50px] w-full rounded-[10px] bg-green font-bold text-dark shadow hover:brightness-95 md:h-[64px] md:w-full xl:w-[233px]"
        >
          Descargar comprobante
        </button>

        {/* Gris – Ir al inicio */}
        <button
          onClick={() => router.push("/dashboard")}
          className="h-[50px] w-full rounded-[10px] bg-gray1 font-bold text-dark shadow hover:brightness-95 md:h-[64px] md:w-full xl:w-[233px]"
        >
          Ir al inicio
        </button>
      </div>
    </main>
  );
}

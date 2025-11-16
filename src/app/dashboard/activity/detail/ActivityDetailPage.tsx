"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTransactionById } from "@/services/transactionService";
import type { TransactionIdType } from "@/types/transaction";
import Cookies from "js-cookie";
import { getAccount } from "@/services/accountService";
import CheckIcon from "@/components/icons/CheckIcon";
import jsPDF from "jspdf";

function formatDated(fecha: string | Date): string {
  const date = new Date(fecha);

  const opciones: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  let fechaHora = new Intl.DateTimeFormat("es-AR", opciones).format(date);

  // Normalizar: ejemplo → "21 de septiembre de 2025 18:47"
  fechaHora = fechaHora.replace("  ", " ");

  return `Creada el ${fechaHora.replace(/(\d{4}) (.*)/, "$1 a las $2")} hs.`;
}

export default function ActivityDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transaction, setTransaction] = useState<TransactionIdType | null>(
    null,
  );
  const [error, setError] = useState("");

  const idParam = searchParams.get("id");

  const handleDownloadReceipt = () => {
    if (!transaction) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Comprobante de Transacción", 20, 20);

    doc.setFontSize(12);
    doc.text(`Estado: Aprobada`, 20, 40);
    doc.text(`Fecha: ${formatDated(transaction.dated ?? "")}`, 20, 50);
    doc.text(`Operación Nº: ${transaction.id}`, 20, 60);
    doc.text(
      `Tipo: ${transaction.type === "deposit" ? "Depósito" : "Transferencia de dinero"}`,
      20,
      70,
    );
    doc.text(
      `Monto: ${transaction.amount.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })}`,
      20,
      80,
    );
    doc.text(`Destino: ${transaction.description || "—"}`, 20, 90);

    doc.save(`comprobante_${transaction.id}.pdf`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token") ?? "";
        if (!idParam || !token) {
          setError("Falta token o id de transacción");
          return;
        }

        const account = await getAccount();

        const txId = Number(idParam);
        if (!Number.isFinite(txId)) {
          setError("Id inválido");
          return;
        }

        const data = await getTransactionById(account.id, txId, token);
        setTransaction(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar transacción");
        }
      }
    };

    fetchData();
  }, [idParam]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!transaction) return <p className="text-dark">Cargando...</p>;

  const isDeposit = String(transaction.type ?? "").toLowerCase() === "deposit";
  const formattedAmount = transaction.amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const random = Math.floor(Math.random() * 1e7);
  const operationNumber = `${random}${transaction.id}`;

  return (
    <main className="flex flex-col gap-6 p-6">
      <div className="rounded-lg bg-dark p-6 text-white shadow-md">
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="border-b-2 border-gray-500 pb-2 sm:border-none sm:pb-0">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green" />
                <h2 className="text-xl font-bold text-green">Aprobada</h2>
              </div>
            </div>

            <p className="pt-2 text-sm text-gray-300 sm:ml-4 sm:pt-0 sm:text-right">
              {formatDated(transaction.dated ?? "")}
            </p>
          </div>

          <div className="hidden border-b-2 border-gray-500 sm:block"></div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="font-bold">
              {isDeposit ? "Depósito" : "Transferencia de dinero"}
            </p>
            <p className="text-xl font-bold text-green">{formattedAmount}</p>
          </div>

          <div>
            <p className="text-sm">
              {isDeposit ? "Ingresaste dinero a" : "Le transferiste a"}
            </p>
            <p className="text-lg font-bold text-green">
              {isDeposit
                ? "Digital Money House"
                : transaction.description || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm">Número de operación</p>
            <p className="text-green">{operationNumber}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row-reverse">
        <button
          onClick={handleDownloadReceipt}
          className="w-full rounded-lg bg-green py-3 font-bold text-black shadow hover:brightness-95 md:w-1/4"
        >
          Descargar comprobante
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-lg bg-gray-300 py-3 font-bold text-dark shadow hover:bg-gray-400 md:w-1/4"
        >
          Ir al inicio
        </button>
      </div>
    </main>
  );
}

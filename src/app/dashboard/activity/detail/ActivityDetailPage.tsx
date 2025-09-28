"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTransactionById } from "@/services/transactionService";
import type { TransactionIdType } from "@/types/transaction";
import Cookies from "js-cookie";
import { getAccount } from "@/services/accountService";
import CheckIcon from "@/components/icons/CheckIcon";

// helpers
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

  // Generamos la fecha en español
  let fechaHora = new Intl.DateTimeFormat("es-AR", opciones).format(date);

  // Normalizar: ejemplo → "21 de septiembre de 2025 18:47"
  fechaHora = fechaHora.replace("  ", " "); // limpiar dobles espacios

  // Separar fecha y hora
  //const [fechaParte, horaParte] = fechaHora.split(" ");

  // Armamos la cadena final
  return `Creada el ${fechaHora.replace(/(\d{4}) (.*)/, "$1 a las $2")} hs.`;
}

/* function getAccountIdFallback(): number | null {
  // 1) cookie
  const c = Cookies.get("accountId");
  if (c && !Number.isNaN(Number(c))) return Number(c);

  // 2) storage
  try {
    const ls =
      typeof window !== "undefined" ? localStorage.getItem("accountId") : null;
    if (ls && !Number.isNaN(Number(ls))) return Number(ls);
  } catch {}

  try {
    const ss =
      typeof window !== "undefined"
        ? sessionStorage.getItem("accountId")
        : null;
    if (ss && !Number.isNaN(Number(ss))) return Number(ss);
  } catch {}

  // 3) JWT (si el token es JWT y trae el id)
  const token = Cookies.get("token");
  if (token && token.split(".").length === 3) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const cand =
        payload?.account_id ??
        payload?.accountId ??
        payload?.account?.id ??
        payload?.data?.account_id;
      if (cand && !Number.isNaN(Number(cand))) return Number(cand);
    } catch {}
  }
  return null;
} */

export default function ActivityDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transaction, setTransaction] = useState<TransactionIdType | null>(
    null,
  );
  const [error, setError] = useState("");

  const idParam = searchParams.get("id");
  //const accParam = searchParams.get("account");

  //const accountId = accParam ? Number(accParam) : getAccountIdFallback();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token") ?? "";
        if (!idParam || !token) {
          setError("Falta token o id de transacción");
          return;
        }

        //  cuenta del backend
        const account = await getAccount();

        // Id de transacción
        const txId = Number(idParam);
        if (!Number.isFinite(txId)) {
          setError("Id inválido");
          return;
        }

        //ransacción con account.id
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
      {/* Caja detalle */}
      <div className="rounded-lg bg-dark p-6 text-white shadow-md">
        <div className="mb-4 flex items-center justify-between border-b-2 border-gray-500 pb-2">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-6 w-6 text-green" />
            <h2 className="text-xl font-bold text-green">Aprobada</h2>
          </div>
          <span className="text-sm">
            {formatDated(transaction.dated ?? "")}
          </span>
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

      {/* Botones abajo */}
      <div className="flex flex-col gap-4 md:flex-row-reverse">
        <button
          onClick={() => console.log("Descargar comprobante")}
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

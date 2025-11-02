"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import MobileCrumb from "@/components/generals/MobileCrumb";
import DetailService from "@/components/pay-services/DetailService";
import SelectedCard from "@/components/add-money/SelectedCard";
import { createTransaction } from "@/services/transactionService";

import { getAccount } from "@/services/accountService";
import { getAllCards } from "@/services/cardService";
import {
  getServiceId,
  payService,
  PayServiceError,
} from "@/services/servicesService";
import { readBalance } from "@/utils/readBalance";

import type { CardType } from "@/types/card";
import { useSelectCard, useSelectService } from "@/context/moneyContext";
import { useTransaction } from "@/context/transactionContext";

export default function CheckedPage() {
  const router = useRouter();

  const [cards, setCards] = useState<CardType[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [serviceAmount, setServiceAmount] = useState<number>(0);
  const [serviceName, setServiceName] = useState<string>("Servicio");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { serviceId } = useSelectService();
  const { cardId, last4, brand } = useSelectCard();
  const { setTransaction } = useTransaction();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const t = Cookies.get("token") ?? "";
        if (!t) {
          setError("Falta token de sesión. Iniciá sesión nuevamente.");
          return;
        }

        // Cuenta (+ saldo)
        const account = await getAccount(); // ya lee cookie
        //console.log("[CheckedPage] account:", account);
        setAccountId(account.id);
        setAccountBalance(readBalance(account));

        // Tarjetas
        const list = await getAllCards(account.id, t);
        setCards(list);

        // Servicio (si no hay, volvemos a la lista)
        if (!serviceId) {
          router.push("/dashboard/payments");
          return;
        }

        const s = await getServiceId(String(serviceId), t);
        // invoice_value puede venir string o number
        const inv =
          typeof s?.invoice_value === "string"
            ? Number(s.invoice_value)
            : s?.invoice_value;

        if (!Number.isNaN(inv as number)) setServiceAmount(inv as number);
        if (s?.name) setServiceName(s.name);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [serviceId, router]);

  const handlePay = async () => {
    // Logs para depurar
    /* console.log(
      "[handlePay] balance:",
      accountBalance,
      "amount:",
      serviceAmount,
      {
        accountId,
        serviceId,
        cardId,
      },
    ); */

    // Guards de datos mínimos
    if (!accountId || !serviceId) {
      setError("Faltan datos para realizar el pago.");
      return;
    }

    const normalizedCardId =
      typeof cardId === "string" ? Number(cardId) : cardId;
    if (!normalizedCardId) {
      setError("Seleccioná una tarjeta.");
      return;
    }

    if (!Number.isFinite(serviceAmount) || serviceAmount <= 0) {
      setError("No se pudo determinar el monto del servicio.");
      return;
    }

    // Pre-chequeo local de saldo
    if (accountBalance < serviceAmount) {
      router.push("/dashboard/payments/account/checked/error?type=funds");
      return;
    }

    try {
      const token = Cookies.get("token") ?? "";

      // 1️⃣ Obtener los datos del servicio (nombre y monto)
      const service = await getServiceId(String(serviceId), token);
      const numberAmount =
        typeof service.invoice_value === "string"
          ? Number(service.invoice_value)
          : (service.invoice_value ?? 0);

      // 2️⃣ Crear el payload para registrar la transacción real
      const data = {
        amount: -Math.abs(numberAmount), // siempre negativo
        dated: new Date().toISOString(),
        description: `Pago a ${service.name}`,
        destination: service.name,
      };

      // 3️⃣ Crear la transacción en el backend
      const transaction = await createTransaction(accountId, data, token);

      // 4️⃣ Guardarla en el contexto local
      setTransaction({
        id: transaction.id ?? 0,
        account_id: accountId,
        amount: transaction.amount,
        dated: transaction.dated ?? new Date().toISOString(),
        description: transaction.description ?? `Pago a ${serviceName}`,
        destination: transaction.destination ?? serviceName,
        origin: "Tarjeta",
        type: "payment",
      });

      // 5️⃣ Ir a la pantalla de éxito
      router.push("/dashboard/payments/account/checked/success");
    } catch (error) {
      console.error("[handlePay] Error al pagar servicio:", error);
      router.push("/dashboard/payments/account/checked/error?type=generic");
    }
  };

  if (loading) return <p className="text-dark">Cargando…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!accountId) return null;

  return (
    <main className="flex flex-col gap-6">
      <MobileCrumb />
      <DetailService />
      <SelectedCard
        cardsList={cards}
        accountId={accountId}
        ctaText="Pagar"
        onContinue={handlePay}
        showNewCardLink={false}
        ctaAlwaysGreen={true}
      />
    </main>
  );
}

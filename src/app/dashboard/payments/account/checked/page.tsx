"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import DetailService from "@/components/pay-services/DetailService";
import SelectedCard from "@/components/add-money/SelectedCard";

import { getAccount } from "@/services/accountService";
import { getAllCards } from "@/services/cardService";
import type { CardType } from "@/types/card";

export default function CheckedPage() {
  const router = useRouter();

  const [cards, setCards] = useState<CardType[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = Cookies.get("token") ?? "";
        if (!token) {
          setError("Falta token de sesión. Iniciá sesión nuevamente.");
          return;
        }

        // Cuenta
        const account = await getAccount(); // si tu getAccount ya usa cookie, no le pases token
        setAccountId(account.id);

        // Tarjetas
        const list = await getAllCards(account.id, token);
        setCards(list);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p className="text-dark">Cargando…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!accountId) return null;

  return (
    <main className="flex flex-col gap-6">
      {/* Cabecera con nombre del servicio + total */}
      <DetailService />

      {/* Lista de tarjetas reutilizable */}
      <SelectedCard
        cardsList={cards}
        accountId={accountId}
        ctaText="Pagar"
        onContinue={() => router.push("/dashboard/payments/confirm")}
        showNewCardLink={false}
        ctaAlwaysGreen={true}
      />
    </main>
  );
}

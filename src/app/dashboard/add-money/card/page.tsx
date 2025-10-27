"use client";

import { useEffect, useState } from "react";
import MobileCrumb from "@/components/generals/MobileCrumb";
import SelectedCard from "@/components/add-money/SelectedCard";
import { useCards } from "@/hooks/useCards";
import { getAccount } from "@/services/accountService";
import Cookies from "js-cookie";

export default function CardPage() {
  const { loading, error, cards, deletingId, removeCard } = useCards();
  const [accountData, setAccountData] = useState<any>(null);
  const [loading1, setLoading1] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const storedToken = Cookies.get("token");
        if (!storedToken) {
          console.error("No se encontró el token en las cookies");
          return;
        }

        setToken(storedToken);
        const account = await getAccount();
        setAccountData(account);
      } catch (error) {
        console.error("Error al obtener la cuenta:", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-5 bg-gray1 px-6 pb-6 pt-0 text-dark">
      <MobileCrumb />

      {loading && <p className="text-dark2">Cargando tarjetas…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && accountData && (
        <SelectedCard
          framed
          title="Seleccionar tarjeta"
          cardsList={cards ?? []}
          accountId={accountData.id}
          accountCvu={accountData.cvu}
          token={token}
          ctaText="Continuar"
          showNewCardLink={true}
          ctaAlwaysGreen={false}
          onDeleteCard={removeCard}
          deletingId={deletingId}
        />
      )}
    </main>
  );
}

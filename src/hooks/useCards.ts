"use client";

import { useCallback, useEffect, useState } from "react";
import { getAccount } from "@/services/accountService";
import { getAllCards, deleteCard, createCard } from "@/services/cardService";
import type { CardType, CardBodyType } from "@/types/card";

export type UseCardsResult = {
  loading: boolean;
  error: string | null;
  accountId: number | null;
  cards: CardType[];
  deletingId: CardType["id"] | null;
  creating: boolean;
  refresh: () => Promise<void>;
  removeCard: (id: CardType["id"]) => Promise<void>;
  addCard: (payload: CardBodyType) => Promise<CardType>;
};

export function useCards({ autoLoad = true }: { autoLoad?: boolean } = {}): UseCardsResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [deletingId, setDeletingId] = useState<CardType["id"] | null>(null);
  const [creating, setCreating] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const acc = await getAccount();
      setAccountId(acc.id);
      const list = await getAllCards(acc.id);
      setCards(list);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "No se pudo cargar tarjetas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) void refresh();
  }, [autoLoad, refresh]);

  const removeCard = useCallback(
    async (id: CardType["id"]) => {
      if (!accountId) return;
      setDeletingId(id);
      const prev = cards;
      setCards((c) => c.filter((x) => x.id !== id)); 
      try {
        await deleteCard(accountId, Number(id));
      } catch (e: unknown) {
        setCards(prev); 
        setError(e instanceof Error ? e.message : "No se pudo eliminar la tarjeta");
      } finally {
        setDeletingId(null);
      }
    },
    [accountId, cards]
  );

  const addCard = useCallback(
    async (payload: CardBodyType) => {
      setCreating(true);
      try {
        let accId = accountId;
        if (!accId) {
          const acc = await getAccount();
          accId = acc.id;
          setAccountId(accId);
        }

        const created = await createCard(accId!, payload);
        setCards((cs) => [created, ...cs]);
        return created;
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "No se pudo crear la tarjeta");
        throw e;
      } finally {
        setCreating(false);
      }
    },
    [accountId]
  );

  return { loading, error, accountId, cards, deletingId, creating, refresh, removeCard, addCard };
}

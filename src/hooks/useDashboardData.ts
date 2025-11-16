"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAccount } from "@/services/accountService";
import { getAllTransactions } from "@/services/transactionService";
import type { TransactionType } from "@/types/transaction";

type AccountMin = { id: number; balance?: number | null };

function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maybe = e as any;
    if (maybe?.message && typeof maybe.message === "string") return maybe.message;
  } catch {}
  return "Error cargando datos";
}

export function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [balance, setBalance] = useState(0);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token") ?? "";
        if (!token) throw new Error("No auth token");

        const acc = (await getAccount()) as AccountMin;
        if (!mounted) return;
        setBalance(acc?.balance ?? 0);
        setAccountId(acc.id);

        const tx = await getAllTransactions(acc.id, token);
        if (!mounted) return;
        setTransactions(tx);
      } catch (e: unknown) {
        if (mounted) {
          setError(errorMessage(e));
          setTransactions([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, error, balance, accountId, transactions };
}

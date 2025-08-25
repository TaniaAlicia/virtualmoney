// services/transactionService.ts
import axios from "axios";
import Cookies from "js-cookie";
import { NewTransactionType, TransactionType } from "@/types/transaction";

const API = process.env.NEXT_PUBLIC_API_URL;

// ✅ ahora puede recibir un token (fallback a cookie)
function authHeader(token?: string) {
  const t = token ?? Cookies.get("token") ?? "";
  if (!t) throw new Error("No auth token found");
  return { Authorization: t };         // SIN 'Bearer' (tu backend lo pidió así)
}

export const getAllTransactions = async (
  accountId: number,
  token?: string
): Promise<TransactionType[]> => {
  if (!accountId) throw new Error("accountId inválido");

  const res = await axios.get(`${API}/accounts/${accountId}/activity`, {
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
  });

  const data = res.data;
  return Array.isArray(data) ? (data as TransactionType[]) : [];
};

export const getTransactionById = async (
  accountId: number,
  transactionId: number,
  token?: string
): Promise<TransactionType> => {
  if (!accountId || !transactionId) throw new Error("Parámetros inválidos");

  const res = await axios.get(
    `${API}/accounts/${accountId}/transactions/${transactionId}`,
    {
      headers: {
        ...authHeader(token),
        "Content-Type": "application/json",
      },
    }
  );

  return res.data as TransactionType;
};

export const createTransaction = async (
  accountId: number,
  payload: NewTransactionType,
  token?: string
): Promise<TransactionType> => {
  if (!accountId) throw new Error("accountId inválido");

  const res = await axios.post(
    `${API}/accounts/${accountId}/transactions`,
    payload,
    {
      headers: {
        ...authHeader(token),
        "Content-Type": "application/json",
      },
    }
  );

  return res.data as TransactionType;
};

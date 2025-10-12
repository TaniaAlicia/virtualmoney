import axios from "axios";
import Cookies from "js-cookie";
import type { DepositType } from "@/types/deposit";

const API = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = (token?: string) => ({
  Authorization: token ?? Cookies.get("token") ?? "",
  "Content-Type": "application/json",
});

export type DepositBody = {
  amount: number;
  dated: string;
  destination: string;
  origin: string;
};

export const createDeposit = async (
  accountId: number,
  body: DepositBody,
  token?: string,
  accountCvu?: string, // 👈 nuevo parámetro opcional
): Promise<DepositType> => {
  const res = await axios.post(
    `${API}/accounts/${accountId}/deposits`,
    body,
    { headers: getAuthHeaders(token) },
  );

  const deposit = res.data as DepositType;

  // ✅ Adaptamos para UI (sin hardcodear)
  return {
    ...deposit,
    createdAt: deposit.dated,
    destinationCvu: accountCvu ?? deposit.destination, // usa el CVU real del usuario si está disponible
  };
};

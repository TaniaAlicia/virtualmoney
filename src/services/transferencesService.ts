import axios from "axios";
import Cookies from "js-cookie";
import type { DepositType } from "@/types/deposit";

const API = "https://digitalmoney.digitalhouse.com/api";

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
  accountCvu?: string,
): Promise<DepositType> => {
  const res = await axios.post(`${API}/accounts/${accountId}/deposits`, body, {
    headers: getAuthHeaders(token),
  });

  const deposit = res.data as DepositType;

  return {
    ...deposit,
    createdAt: deposit.dated,
    destinationCvu: accountCvu ?? deposit.destination,
  };
};

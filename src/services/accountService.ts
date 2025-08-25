import axios from "axios";
import Cookies from "js-cookie";
import { AccountType } from "@/types/Account";

export const getAccount = async (): Promise<AccountType> => {
  const token = Cookies.get("token") ?? ""; // <-- sin "Bearer"

  if (!token) throw new Error("No auth token found");

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
    headers: {
      Authorization: token,        // <-- SIN Bearer
      // "Content-Type": "application/json", // opcional en GET
    },
  });

  return res.data as AccountType;
};

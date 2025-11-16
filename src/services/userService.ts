import axios from "axios";
import Cookies from "js-cookie";
import type { RegisterDataUser } from "@/types/user";

export const getUserById = async (userId: number, token: string) => {
  const response = await axios.get(
    `https://digitalmoney.digitalhouse.com/api/users/${userId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    },
  );
  return response.data;
};

export const updateUser = async (
  userId: number,
  data: Partial<RegisterDataUser>,
  token?: string,
) => {
  const t = token || Cookies.get("token");
  if (!t) throw new Error("No auth token");

  const res = await axios.patch(
    `https://digitalmoney.digitalhouse.com/api/users/${userId}`,
    data,
    {
      headers: {
        Authorization: t,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

export async function getMe() {
  const token = Cookies.get("token") ?? "";
  if (!token) throw new Error("No auth token found");

  const res = await axios.get(
    `https://digitalmoney.digitalhouse.com/api/users/me`,
    {
      headers: { Authorization: token, "Content-Type": "application/json" },
    },
  );
  return res.data;
}

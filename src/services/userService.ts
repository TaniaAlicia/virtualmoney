import axios from 'axios';
import Cookies from "js-cookie";
import type { RegisterDataUser } from "@/types/user"

export const getUserById = async (userId: number, token: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const updateUser = async (
  userId: number,
  data: Partial<RegisterDataUser>,
  token?: string
) => {
  // usa siempre el mismo mecanismo que los otros services
  const t = token || Cookies.get("token");
  if (!t) throw new Error("No auth token");

  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    data,
    {
      headers: {
        Authorization: t, // 👈 igual que en getAccount / getUserById
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

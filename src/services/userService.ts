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

/* type ApiUserPatch = {
  firstname?: string;
  lastname?: string;
  dni?: number;
  email?: string;
  password?: string;
  phone?: string;
}; */

// ADDED: helper para mapear camelCase (front) → formato API
/* function toApiPayload(data: Partial<RegisterDataUser>): ApiUserPatch {
  const out: ApiUserPatch = {};

  if (data.firstName !== undefined) out.firstname = data.firstName;
  if (data.lastName !== undefined) out.lastname = data.lastName;
  if (data.dni !== undefined) out.dni = data.dni;
  if (data.email !== undefined) out.email = data.email;
  if (data.password !== undefined) out.password = data.password;
  if (data.phone !== undefined) out.phone = data.phone;

  return out;
} */

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
        Authorization: t, //igual que en getAccount / getUserById
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export async function getMe() {
  const token = Cookies.get("token") ?? "";
  if (!token) throw new Error("No auth token found");

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  return res.data; // asegúrate de que tenga account.id o accounts[0].id
}
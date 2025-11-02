import axios from 'axios';
import Cookies from 'js-cookie';
import { RegisterDataUser } from '@/types/user';

export const login = async (email: string, password: string) => {
  const response = await axios.post("/api/login", { email, password });
  const { token } = response.data as { token?: string };

  if (!token) throw new Error("No se recibió token en el login");

  // Normalizamos: guardamos SIEMPRE el token sin el prefijo
  const rawToken = token.replace(/^bearer\s+/i, "");

  // cookie accesible en toda la app
  Cookies.set("token", rawToken, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response.data;
};

export const logout = () => {
  Cookies.remove("token", { path: "/" });
};

export const registerUser = async (data: RegisterDataUser) => {
  const response = await axios.post('/api/register', data);
  return response.data;
};

/** Devuelve { Authorization: "<token>" } o con Bearer si lo pedís */
export function getAuthHeader(
  explicitToken?: string,
  withBearer = false
): Record<string, string> {
  const token = explicitToken ?? Cookies.get("token") ?? "";
  if (!token) return {};

  return {
    Authorization: withBearer ? `Bearer ${token}` : token,
  };
}

/** Si solo querés el token crudo (sin Bearer) */
export function getAuthToken(): string | null {
  return Cookies.get("token") ?? null;
}
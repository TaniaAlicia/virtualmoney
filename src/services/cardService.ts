// src/services/cardService.ts
import axios from "axios";
import Cookies from "js-cookie";
import type { CardBodyType, CardType } from "@/types/card";

const API = process.env.NEXT_PUBLIC_API_URL;

// Lo que devuelve el backend (shape conocido + campos opcionales)
type RawCardFromAPI = {
  id?: number | string;
  account_id?: number;
  number_id?: number | string;
  number?: number | string;
  first_last_name?: string;
  expiration_date?: string;
  cod?: number;
  last4?: string;
  brand?: string;
  createdAt?: string;
};

// normaliza y asegura last4
function normalize(c: RawCardFromAPI): CardType {
  const last4 =
    (c.last4 ??
      String(c.number_id ?? c.number ?? "").toString().slice(-4)) || "----";

  return {
    // forzamos tipos a los del front
    id: (c.id ?? "") as number | string,
    account_id: c.account_id,
    number_id:
      typeof c.number_id === "string" ? Number(c.number_id) : c.number_id,
    first_last_name: c.first_last_name,
    expiration_date: c.expiration_date,
    cod: c.cod,
    brand: c.brand,
    createdAt: c.createdAt,
    last4,
  };
}

// tomar el token del argumento o de la cookie
function authHeader(token?: string) {
  const t = token ?? Cookies.get("token") ?? "";
  if (!t) throw new Error("No auth token found");
  return { Authorization: t }; // SIN 'Bearer'
}

function errorMessage(e: unknown): string {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status;
    const data = e.response?.data as { message?: string } | undefined;
    const msg = data?.message ?? e.message;
    return status ? `Error ${status}: ${msg}` : msg;
  }
  if (e instanceof Error) return e.message;
  return "Error desconocido";
}

/** Obtener todas las tarjetas de una cuenta */
export async function getAllCards(
  accountId: number,
  token?: string
): Promise<CardType[]> {
  if (!accountId) throw new Error("accountId inválido");
  try {
    const res = await axios.get(`${API}/accounts/${accountId}/cards`, {
      headers: { ...authHeader(token) },
    });
    const data: RawCardFromAPI[] = Array.isArray(res.data) ? res.data : [];
    return data.map(normalize);
  } catch (e) {
    throw new Error(errorMessage(e));
  }
}

/** Obtener una tarjeta por id */
export async function getCardById(
  accountId: number,
  cardId: number,
  token?: string
): Promise<CardType> {
  if (!accountId || !cardId) throw new Error("Parámetros inválidos");
  try {
    const res = await axios.get(
      `${API}/accounts/${accountId}/cards/${cardId}`,
      { headers: { ...authHeader(token) } }
    );
    return normalize(res.data as RawCardFromAPI);
  } catch (e) {
    throw new Error(errorMessage(e));
  }
}

/** Crear nueva tarjeta */
export async function createCard(
  accountId: number,
  payload: CardBodyType,
  token?: string
): Promise<CardType> {
  if (!accountId) throw new Error("accountId inválido");
  try {
    const res = await axios.post(
      `${API}/accounts/${accountId}/cards`,
      payload,
      {
        headers: {
          ...authHeader(token),
          "Content-Type": "application/json",
        },
      }
    );
    return normalize(res.data as RawCardFromAPI);
  } catch (e) {
    throw new Error(errorMessage(e));
  }
}

/** Eliminar tarjeta */
export async function deleteCard(
  accountId: number,
  cardId: number,
  token?: string
): Promise<void> {
  if (!accountId || !cardId) throw new Error("Parámetros inválidos");
  try {
    await axios.delete(`${API}/accounts/${accountId}/cards/${cardId}`, {
      headers: { ...authHeader(token) },
    });
  } catch (e) {
    throw new Error(errorMessage(e));
  }
}

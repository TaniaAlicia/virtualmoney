import { ServiceType } from "@/types/service";

const BASE_URL = process.env.NEXT_PUBLIC_SERVICE_URL;

// ✅ Obtener todos los servicios
export const getAllServices = async (): Promise<ServiceType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/service`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text(); // leemos la respuesta como texto una sola vez

    if (!response.ok) {
      let errorMessage = text;
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // no era JSON, usamos el texto crudo
      }
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al obtener servicios:", error.message);
    } else {
      console.error("Error desconocido al obtener servicios:", error);
    }
    return [];
  }
};

export const getServiceId = async (
  id: string,
  token?: string
): Promise<ServiceType> => {
  const response = await fetch(`${BASE_URL}/service/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    let msg = text;
    try {
      const json = JSON.parse(text);
      msg = json.message || msg;
    } catch {}
    throw new Error(`Error ${response.status}: ${msg}`);
  }

  return response.json();
};

/* async function readAsJsonSafe<T = unknown>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
} */
/* ------------------- Pago de servicio ------------------- */
export type PayFailReason = "insufficient_funds" | "no_invoice" | "generic";

export class PayServiceError extends Error {
  reason: PayFailReason;
  constructor(reason: PayFailReason, message?: string) {
    super(message ?? reason);
    this.reason = reason;
  }
}

export async function payService(params: {
  accountId: number;
  serviceId: number | string;
  cardId: number | string;
  amount: number;
  token?: string;
}) {
  const { accountId, serviceId, cardId, amount, token } = params;

  const res = await fetch(`${BASE_URL}/service/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
    body: JSON.stringify({
      account_id: accountId,
      service_id: serviceId,
      card_id: cardId,
      amount,
    }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const status = res.status;
    const code = data?.code || data?.error;

    if (status === 402 || code === "INSUFFICIENT_FUNDS")
      throw new PayServiceError("insufficient_funds");
    if (status === 404 || code === "INVOICE_NOT_FOUND")
      throw new PayServiceError("no_invoice");

    throw new PayServiceError("generic", data?.message ?? `Error ${status}`);
  }

  return data;
}
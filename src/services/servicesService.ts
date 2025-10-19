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

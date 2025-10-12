import axios from "axios";
import Cookies from "js-cookie";

const API = process.env.NEXT_PUBLIC_API_URL;

// helper para token
function authHeader(token?: string) {
  const t = token ?? Cookies.get("token") ?? "";
  if (!t) throw new Error("No auth token found");
  return { Authorization: t }; // sin "Bearer"
}

// Obtener un servicio por ID
export const getServiceId = async (serviceId: string, token?: string) => {
  if (!serviceId) throw new Error("serviceId inválido");

  const res = await axios.get(`${API}/services/${serviceId}`, {
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// (Opcional) obtener todos los servicios
export const getAllServices = async (token?: string) => {
  const res = await axios.get(`${API}/services`, {
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

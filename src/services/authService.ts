import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Login con email y contraseña.
 */
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // { token: "..." }
};

/**
 * Logout: elimina la cookie de sesión.
 */
export const logout = () => {
  Cookies.remove("token", { path: "/" });
};

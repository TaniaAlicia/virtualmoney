import axios from 'axios';
import Cookies from 'js-cookie';
import { RegisterDataUser } from '@/types/user';

/**
 * Login con email y contraseña (usando endpoint enmascarado).
 */
export const login = async (email: string, password: string) => {
   const response = await axios.post("/api/login", { email, password });
  return response.data; // { token: "..." }
};

/**
 * Logout: elimina la cookie de sesión.
 */
export const logout = () => {
  Cookies.remove("token", { path: "/" });
};


export const registerUser = async (data: RegisterDataUser) => {
  const response = await axios.post('/api/register', data); // <--- enmascarado
  return response.data;
};

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  exp: number; // tiempo de expiración en segundos
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Date.now() / 1000; // en segundos
    return decoded.exp < now;
  } catch {
    return true; // si falla la decodificación, tratamos como expirado
  }
}

/**
 * Redirige si no hay token válido en cookies.
 * @param redirectTo Ruta a redirigir si no hay sesión. Por defecto: "/login"
 */
export default function useAuthRedirect(redirectTo: string = "/login") {
  const router = useRouter();

   /*  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]); */

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token || isTokenExpired(token)) {
      Cookies.remove("token", { path: "/" });
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}

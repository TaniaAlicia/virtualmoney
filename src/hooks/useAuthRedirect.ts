import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

/**
 * Redirige si no hay token presente en cookies.
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
    if (!token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}

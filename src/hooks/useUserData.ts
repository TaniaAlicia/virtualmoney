"use client";
import { useEffect, useState } from "react";
import { RegisterDataUser } from "@/types/user";
import { getUserById } from "@/services/userService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type JwtPayload = {
  username: number; 
};

export const useUserData = () => {
  const [userData, setUserData] = useState<RegisterDataUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setError("Token no encontrado");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.username;

        const data = await getUserById(userId, token);
        if (data) {
          
        const transformedData: RegisterDataUser = {
          firstName: data.firstname,
          lastName: data.lastname,
          dni: Number(data.dni),
          email: data.email,
          password: data.password,
          phone: data.phone,
        };
         setUserData(transformedData);
        } else {
          setError("Usuario no encontrado");
        }
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setError("No se pudo obtener el usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);
  
  return { userData, loading, error };
};

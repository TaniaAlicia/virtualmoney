"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { updateUser } from "@/services/userService";
import type { RegisterDataUser } from "@/types/user";

export const useUpdateUser = (userId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (data: Partial<RegisterDataUser>) => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token") ?? "";
      const updated = await updateUser(userId, data, token);
      return updated; // usuario actualizado
    } catch (err: any) {
      console.error("Error al actualizar usuario:", err);
      setError(err.message ?? "Error al actualizar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

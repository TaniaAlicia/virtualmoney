"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MobileCrumb from "@/components/generals/MobileCrumb";
import { getAccount } from "@/services/accountService";
import { getUserById } from "@/services/userService";
import ProfileCard from "@/components/profile/ProfileCard";
import PaymentsCTA from "@/components/profile/PaymentsCTA";
import CvuAliasCard from "@/components/profile/CvuAliasCard";

type Account = {
  id: number;
  user_id?: number;
  userId?: number;
  cvu?: string;
  alias?: string;
  balance?: number;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  dni: number;
  phone: string;
};

export default function ProfilePage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = Cookies.get("token") || "";
        if (!token) {
          console.warn("No auth token; redirigí al login si hace falta");
          return;
        }

        const acc = await getAccount();
        if (!mounted) return;
        setAccount(acc as Account);

        const userId = (acc as Account)?.user_id ?? (acc as Account)?.userId;
        if (userId == null) {
          console.error("userId faltante en account:", acc);
          return;
        }

        const u = await getUserById(userId, token);
        if (!mounted) return;

        const normalized: UserData = {
          firstName: u.firstname ?? u.nombre ?? "",
          lastName: u.lastname ?? u.apellido ?? "",
          email: u.email ?? "",
          dni: u.dni ?? "",
          phone: u.phone ?? u.telefono ?? "",
        };

        setUser(normalized);
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // NEW: actualiza el estado local para reflejar el cambio inmediatamente
  const handleRowUpdate = (
    field: "firstName" | "lastName" | "phone" | "password",
    value: string
  ) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            ...(field === "firstName" && { firstName: value }),
            ...(field === "lastName" && { lastName: value }),
            ...(field === "phone" && { phone: value }),
            // password no se refleja en pantalla
          }
        : prev
    );
  };

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
      <MobileCrumb />

      <ProfileCard
        // NEW: pasamos el callback para refrescar la UI sin recargar
        onUpdate={handleRowUpdate}
        rows={[
          { label: "Email", value: user?.email ?? "", locked: true },
          {
            label: "Nombre",
            value: user?.firstName ?? "",
            field: "firstName",
            userId: account?.user_id,
          },
          {
            label: "Apellido",
            value: user?.lastName ?? "",
            field: "lastName",
            userId: account?.user_id,
          },
          { label: "CUIT", value: String(user?.dni ?? ""), locked: true },
          {
            label: "Teléfono",
            value: user?.phone ?? "",
            field: "phone",
            userId: account?.user_id,
          },
          {
            label: "Contraseña",
            value: "", // NEW: password vacío al cargar (no "******")
            field: "password",
            userId: account?.user_id,
          },
        ]}
      />

      <PaymentsCTA />
      <CvuAliasCard cvu={account?.cvu ?? ""} alias={account?.alias ?? ""} />
    </main>
  );
}

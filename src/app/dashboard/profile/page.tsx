"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MobileCrumb from "@/components/generals/MobileCrumb";

// services que ya tenés
import { getAccount } from "@/services/accountService"; // NO recibe args (lee cookie adentro)
import { getUserById } from "@/services/userService"; // getUserById(userId, token)

// componentes de UI del perfil (los que hicimos/adaptamos)
import ProfileCard from "@/components/profile/ProfileCard";
import PaymentsCTA from "@/components/profile/PaymentsCTA";
import CvuAliasCard from "@/components/profile/CvuAliasCard";

// tipos opcionales (podés ajustar a tus types reales)
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
  dni: number; // CUIT/DNI mostrado como “CUIT” en la UI
  phone: string;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // leemos el token para userService (getAccount lo resuelve solo)
        const token = Cookies.get("token") || "";
        if (!token) {
          console.warn("No auth token; redirigí al login si hace falta");
          if (mounted) setLoading(false);
          return;
        }

        // 1) Cuenta (NO pasar token: tu service la arma solo)
        const acc = await getAccount();
        if (!mounted) return;
        setAccount(acc as Account);

        // 2) Obtener userId de la cuenta (user_id o userId)
        const userId = (acc as any)?.user_id ?? (acc as any)?.userId;
        if (userId == null) {
          console.error("userId faltante en account:", acc);
          if (mounted) setLoading(false);
          return;
        }

        // 3) Traer usuario con el token
        const u = await getUserById(userId, token);
        if (!mounted) return;

        // Normalizo a la forma que espera el ProfileCard
        const normalized: UserData = {
          firstName: u.firstname ?? u.nombre ?? "", // fallback por si API devuelve "nombre"
          lastName: u.lastname ?? u.apellido ?? "", // fallback por si API devuelve "apellido"
          email: u.email ?? "",
          dni: u.dni ?? u.cuit ?? "", // por si la API devuelve "cuit"
          phone: u.phone ?? u.telefono ?? "",
        };

        setUser(normalized);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="max-w-8xl mx-auto flex-1 space-y-6 px-6 pb-6 pt-3 text-dark">
      {/* Breadcrumb móvil */}
      <MobileCrumb />

      {/* Tus datos */}
      <ProfileCard
        rows={[
          {
            label: "Email",
            value: user?.email ?? "",
            editHref: "/dashboard/profile/edit/email",
          },
          {
            label: "Nombre y Apellido",
            value: `${user?.firstName} ${user?.lastName}`,
            editHref: "/dashboard/profile/edit/name",
          },
          { label: "CUIT", value: String(user?.dni ?? ""), locked: true },
          {
            label: "Teléfono",
            value: user?.phone ?? "",
            editHref: "/dashboard/profile/edit/phone",
          },
          {
            label: "Contraseña",
            value: "******",
            editHref: "/dashboard/profile/edit/password",
          },
        ]}
      />

      {/* CTA: Gestioná los medios de pago */}
      <PaymentsCTA />

      {/* CVU / Alias */}
      <CvuAliasCard
        /* loading={loading} */
        cvu={account?.cvu ?? ""}
        alias={account?.alias ?? ""}
      />
    </main>
  );
}

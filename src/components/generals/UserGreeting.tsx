"use client";
import React from "react";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";

type Props = {
  compact?: boolean; // NUEVO
};

function UserGreeting({ compact = false }: Props) {
  const { userData } = useUserData();

  const initials = `${userData?.firstName?.[0] || ""}${userData?.lastName?.[0] || ""}`;

  return (
    <div className="flex items-center space-x-2">
      {/* Badge con iniciales */}
      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-green font-bold text-black">
        {initials}
      </div>

      {/* Texto visible solo si NO es compacto */}
      {!compact && (
        <Link href="/dashboard" className="no-underline">
          <span className="text-sm font-semibold">
            Hola, {userData?.firstName} {userData?.lastName}
          </span>
        </Link>
      )}
    </div>
  );
}
export default React.memo(UserGreeting);

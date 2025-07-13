"use client";

import { useUserData } from "@/hooks/useUserData";

export default function UserGreeting() {
  const { userData } = useUserData();

  const initials = `${userData?.firstName?.[0] || ""}${userData?.lastName?.[0] || ""}`;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-green font-bold text-black">
        {initials}
      </div>
      <span className="text-sm font-semibold">
        Hola, {userData?.firstName} {userData?.lastName}
      </span>
    </div>
  );
}

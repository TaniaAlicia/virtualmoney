"use client";

import { useUserData } from "@/hooks/useUserData";

export default function UserGreeting() {
  const { userData } = useUserData();

  const initials = `${userData?.firstName?.[0] || ""}${userData?.lastName?.[0] || ""}`;

  console.log(userData);

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-[8px] bg-green text-black font-bold flex items-center justify-center">
        {initials}
      </div>
      <span className="text-sm font-semibold">
        Hola, {userData?.firstName} {userData?.lastName}
      </span>
    </div>
  );
}

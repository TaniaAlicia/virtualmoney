"use client";
import SearchIcon from "@/components/icons/SearchIcon";

export default function ServiceFilter() {
  return (
    <div className="w-full h-[64px] flex items-center gap-4 px-5 bg-white border border-gray1 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]">
      <SearchIcon />
      <input
        type="text"
        placeholder="Buscá entre más de 5.000 empresas"
        className="w-full text-dark1 text-base placeholder:text-gray-400 outline-none border-none bg-transparent"
      />
    </div>
  );
}

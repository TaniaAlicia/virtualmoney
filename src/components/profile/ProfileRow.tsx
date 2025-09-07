"use client";
import EditIcon from "@/components/profile/EditIcon";
import Link from "next/link";

type Props = {
  label: string;
  value: string;
  editHref?: string; // si no viene, no se muestra el icono
  locked?: boolean;  // para DNI (no editable)
};




export default function ProfileRow({ label, value, editHref, locked }: Props) {
  return (
    <div className="grid grid-cols-[160px,1fr,28px] items-center py-2">
      {/* Label */}
      <span className="text-dark2 text-sm">{label}</span>

      {/* Valor */}
      <span className="text-dark1 text-sm truncate">{value}</span>

      {/* Icono editar (si aplica) */}
      {!locked && editHref ? (
        <Link
          href={editHref}
          aria-label={`Editar ${label}`}
          className="justify-self-end  text-gray2  hover:text-dark"
        >
          <EditIcon />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

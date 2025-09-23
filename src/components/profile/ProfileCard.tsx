"use client";
import ProfileRow from "./ProfileRow";

type Row = {
  label: string;
  value: string;
  locked?: boolean;
  field?: "fullName" | "firstName" | "lastName" | "phone" | "password"; // CHANGED
  userId?: number;
};

type Props = {
  rows: Row[];
  // ⬇️ callback que baja a cada Row
   onUpdate?: (
    field: "firstName" | "lastName" | "phone" | "password",
    value: string
  ) => void; // CHANGED
};

export default function ProfileCard({ rows, onUpdate }: Props) {
  return (
    <section className="rounded-[10px] bg-white p-4 shadow md:px-6 md:py-5">
      <h3 className="text-dark1 mb-3 font-semibold">Tus datos</h3>

      <div className="divide-y divide-[#EAEAEA]">
        {rows.map((r, i) => (
          <ProfileRow key={i} {...r} onUpdate={onUpdate} />
        ))}
      </div>
    </section>
  );
}

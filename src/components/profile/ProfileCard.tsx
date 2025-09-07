"use client";
import ProfileRow from "./ProfileRow";

type Row = {
  label: string;
  value: string;
  locked?: boolean;
  field?: "firstName" | "lastName" | "phone" | "password";
  userId?: number;
};

type Props = {
  rows: Row[];
  // ⬇️ callback que baja a cada Row
  onUpdate?: (field: NonNullable<Row["field"]>, value: string) => void;
};

export default function ProfileCard({ rows, onUpdate }: Props) {
  return (
    <section className="rounded-[10px] bg-white shadow p-4 md:px-6 md:py-5">
      <h3 className="text-dark1 font-semibold mb-3">Tus datos</h3>

      <div className="divide-y divide-[#EAEAEA]">
        {rows.map((r, i) => (
          <ProfileRow key={i} {...r} onUpdate={onUpdate} />
        ))}
      </div>
    </section>
  );
}

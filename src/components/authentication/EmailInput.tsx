import { useFormContext } from "react-hook-form";

export default function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors.email?.message as string | undefined;

  return (
    <div className="w-full flex flex-col">
      <input
        type="email"
        placeholder="Correo electrónico"
        className={`h-[64px] w-full rounded-[10px] p-4 text-black border ${
          error ? "border-red-500" : "border-transparent"
        }`}
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo inválido",
          },
        })}
      />
      {error && (
        <p className="mt-2 text-sm italic text-error">{error}</p>
      )}
    </div>
  );
}

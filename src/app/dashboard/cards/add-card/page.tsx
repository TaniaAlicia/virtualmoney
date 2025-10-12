"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";

import ImageCard from "@/components/cards/ImageCard";
import { CardScheme } from "@/schemas/card.scheme";
import { convertDateFormat } from "@/utils/convertDateFormat";
import { useCards } from "@/hooks/useCards";
import type { CardBodyType, CardFormData } from "@/types/card";
import MobileCrumb from "@/components/generals/MobileCrumb";

const onlyDigits = (s: string) => s.replace(/\D/g, "");
const formatCardNumber = (v: string) =>
  onlyDigits(v)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
const formatExpiry = (v: string) => {
  const d = onlyDigits(v).slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2, 4)}`;
};

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
};
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm text-dark2">{label}</label>}

        <input
          ref={ref}
          {...props}
          className={clsx(
            // base
            "w-full rounded-xl border-green bg-white px-4 py-3 text-dark placeholder-dark2/70",
            "border border-[#DDE8E0]",
            // relieve base
            "shadow-[0_1.5px_1.5px_rgba(0,0,0,0.10),0_8px_16px_rgba(0,0,0,0.08)]",
            // foco: mantener azul + verde más fuerte y suave
            "focus:outline-green-400 focus:outline-2",
            "focus:border-[#C1FD35] focus:ring-4 focus:ring-[#C1FD35]/45",
            "transition-[box-shadow,border,outline,ring] duration-200 ease-out",
            // error
            error &&
              "border-red-500 focus:outline-red-500 focus:ring-red-500/30",
            className,
          )}
        />

        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";

export default function AddCardPage() {
  const router = useRouter();
  const { addCard, creating } = useCards({ autoLoad: false });

  const [serverError, setServerError] = useState<string | null>(null);
  const [focused, setFocused] = useState<
    "number" | "name" | "expiry" | "cvc" | undefined
  >(undefined);

  const form = useForm<CardFormData>({
    resolver: yupResolver(CardScheme),
    defaultValues: {
      numberCard: "",
      nameTitular: "",
      expirationDate: "",
      securityCode: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
    reset,
    register,
  } = form;

  const cardValues = watch();

  const onSubmit = async (data: CardFormData) => {
    try {
      const payload: CardBodyType = {
        cod: Number(data.securityCode),
        expiration_date: convertDateFormat(data.expirationDate), // "YYYY-MM"
        first_last_name: data.nameTitular,
        number_id: Number(onlyDigits(data.numberCard)),
      };

      await addCard(payload);
      reset();
      router.push("/dashboard/cards");
      router.refresh();
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : "Error desconocido al crear la tarjeta";
      setServerError(msg);
    }
  };

  return (
    <section className="flex w-full flex-col items-center gap-5 rounded-[10px] bg-white p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:p-8 xl:px-28 xl:py-8">
      <div className="flex w-full justify-start">
        <MobileCrumb />
      </div>

      {/* Tarjetita (react-credit-cards-2) */}
      <ImageCard
        number={cardValues.numberCard || ""}
        name={cardValues.nameTitular || ""}
        expiry={cardValues.expirationDate || ""}
        cvc={cardValues.securityCode || ""}
        focused={focused}
      />

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[300px] flex-col items-center justify-between gap-5 md:w-[360px] md:gap-4 lg:grid lg:w-full lg:grid-cols-2 lg:gap-6"
        >
          <div className="flex w-full flex-col gap-5 md:gap-4 lg:col-span-1">
            {/* Número de tarjeta */}
            <Controller
              name="numberCard"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Número de la tarjeta*"
                  error={errors.numberCard?.message}
                  inputMode="numeric"
                  maxLength={19}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(formatCardNumber(e.target.value))
                  }
                  onFocus={() => setFocused("number")}
                />
              )}
            />

            {/* Nombre del titular */}
            <TextInput
              {...register("nameTitular")}
              placeholder="Nombre y apellido*"
              error={errors.nameTitular?.message}
              onFocus={() => setFocused("name")}
            />
          </div>

          <div className="flex w-full flex-col gap-5 md:flex-row md:gap-4 lg:col-span-1 lg:flex-col">
            {/* Fecha de vencimiento */}
            <Controller
              name="expirationDate"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Fecha de vencimiento*"
                  error={errors.expirationDate?.message}
                  inputMode="numeric"
                  maxLength={5}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(formatExpiry(e.target.value))
                  }
                  onFocus={() => setFocused("expiry")}
                />
              )}
            />

            {/* Código de seguridad */}
            <Controller
              name="securityCode"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Código de seguridad*"
                  error={errors.securityCode?.message}
                  inputMode="numeric"
                  maxLength={3}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(onlyDigits(e.target.value).slice(0, 3))
                  }
                  onFocus={() => setFocused("cvc")}
                />
              )}
            />
          </div>

          {/* Botón enviar */}
          <div className="w-full md:mt-5 lg:col-span-1 lg:col-start-2 lg:mt-0">
            <button
              type="submit"
              disabled={!isValid || creating}
              className={clsx(
                "w-full rounded-xl border px-6 py-3 font-bold transition-all duration-200",
                "shadow-[0_1.5px_1.5px_rgba(0,0,0,0.10),0_6px_14px_rgba(0,0,0,0.08)]",
                !isValid || creating
                  ? "cursor-not-allowed border-[#D9D9D9] bg-[#D9D9D9] text-dark/60"
                  : "border-[#C1FD35] bg-[#C1FD35] text-black hover:brightness-95 focus:outline-2 focus:outline-blue-500 focus:ring-4 focus:ring-[#C1FD35]/35",
              )}
            >
              {creating ? "Guardando..." : "Continuar"}
            </button>
          </div>

          {/* Error del servidor */}
          {serverError && (
            <p className="text-error1 mt-4 w-[300px] text-center text-sm font-semibold italic md:w-[360px] md:text-base">
              {serverError}
            </p>
          )}
        </form>
      </FormProvider>
    </section>
  );
}

'use client'

import PublicLayout from '@/components/PublicLayout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormValues = {
  email: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const router = useRouter()

  const onSubmit = (data: FormValues) => {
    router.push(`/login/password?email=${encodeURIComponent(data.email)}`)
  }

  return (
    <PublicLayout variant="login">
      <main className="flex grow flex-col items-center justify-center px-4">
        <h2 className="mb-6 text-center font-bold">¡Hola! Ingresá tu e-mail</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center">
          <input
            type="email"
            placeholder="Correo electrónico"
            className={`h-[64px] w-[360px] rounded-[10px] p-4 text-black border ${
              errors.email ? 'border-red-500' : 'border-transparent'
            }`}
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Correo inválido',
              },
            })}
          />

          <button
            type="submit"
            className="h-[64px] w-[360px] rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300"
          >
            Continuar
          </button>

          <Link
            href="/register"
            className="h-[64px] w-[360px] rounded-[10px] bg-gray-300 py-4 text-center font-bold text-black"
          >
            Crear cuenta
          </Link>

          {errors.email && (
            <p className="mt-2 text-sm italic text-error">
              {errors.email.message}
            </p>
          )}
        </form>
      </main>
    </PublicLayout>
  )
}

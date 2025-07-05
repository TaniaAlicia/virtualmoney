'use client'

import PublicLayout from '@/components/PublicLayout'
import { useForm } from 'react-hook-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/services/authService'

type FormData = {
  password: string
}

export default function PasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''

  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(email, data.password)
      localStorage.setItem('token', response.token)
      setErrorMsg('')
      router.push('/dashboard') 
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMsg('Correo o contraseña inválidos')
      } else {
        setErrorMsg('Ocurrió un error. Intentalo más tarde.')
      }
    }
  }

  return (
    <PublicLayout variant="login">
      <main className="flex grow flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-center font-bold">Ingresá tu contraseña</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3">
          <input
            type="password"
            placeholder="Contraseña"
            className={`h-[64px] w-[360px] rounded-[10px] px-[20px] text-black border ${
              errors.password || errorMsg ? 'border-red-500' : 'border-transparent'
            }`}
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />

          <button
            type="submit"
            className="h-[64px] w-[360px] rounded-[10px] bg-green font-bold text-black transition hover:bg-lime-300"
          >
            Continuar
          </button>

          {errorMsg && <p className="text-sm italic text-error">{errorMsg}</p>}
        </form>
      </main>
    </PublicLayout>
  )
}

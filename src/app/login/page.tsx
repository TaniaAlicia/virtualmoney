'use client';

import BaseLayout from '@/components/generals/BaseLayout';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import EmailInput from '@/components/authentication/EmailInput';

type FormValues = {
  email: string;
};

export default function LoginPage() {
  const methods = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    router.push(`/login/password?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <BaseLayout variant="login">
      <main className="flex grow flex-col items-center justify-center px-4">
        <h2 className="mb-6 text-center font-bold">¡Hola! Ingresá tu e-mail</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 items-center"
          >
            <EmailInput />

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
          </form>
        </FormProvider>
      </main>
    </BaseLayout>
  );
}

'use client';

import ErrorMessage from '@/components/commons/ErrorMessage';
import { useRouter } from 'next/navigation';

export default function PayServicesErrorPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-6">
      <ErrorMessage
        title="No encontramos facturas asociadas a este dato"
        description="Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura."
        buttonText="Revisar dato"
        onClick={() => router.push('/dashboard/payments/account')}
      />
    </main>
  );
}

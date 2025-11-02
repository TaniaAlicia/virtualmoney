'use client';

import ErrorMessage from '@/components/commons/ErrorMessage';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PayServicesErrorPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const type = (sp.get('type') || 'generic') as
    | 'funds'
    | 'no-invoice'
    | 'generic';

  const variants = {
    funds: {
      title: 'Hubo un problema con tu pago',
      description: 'Puede deberse a fondos insuficientes. Comunicate con la entidad emisora de la tarjeta.',
      buttonText: 'Volver a intentarlo',
      onClick: () => router.back(),
    },
    'no-invoice': {
      title: 'No encontramos facturas asociadas a este dato',
      description:
        'Revisá el dato ingresado. Si es correcto, es posible que la empresa aún no haya cargado tu factura.',
      buttonText: 'Revisar dato',
      onClick: () => router.push('/dashboard/payments/account'),
    },
    generic: {
      title: 'Hubo un problema con tu pago',
      description: 'Intentalo nuevamente en unos minutos.',
      buttonText: 'Volver a intentarlo',
      onClick: () => router.back(),
    },
  } as const;

  const v = variants[type];

  return (
    <main className="flex flex-col gap-6">
      <ErrorMessage
        title={v.title}
        description={v.description}
        buttonText={v.buttonText}
        onClick={v.onClick}
      />
    </main>
  );
}

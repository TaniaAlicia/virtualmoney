/* // utils/tx.ts
export type TxType =
  | 'deposit'            // Depósito de dinero
  | 'transfer_in'        // Transferencia recibida
  | 'refund'             // Reversa / devolución
  | 'payment'            // Pago (servicios, tarjeta)
  | 'transfer_out'       // Transferencia enviada
  | 'fee'                // Comisión
  | string;

const DEBIT_TYPES = new Set<TxType>(['payment', 'transfer_out', 'fee']);
const CREDIT_TYPES = new Set<TxType>(['deposit', 'transfer_in', 'refund']);

export function isDebit(type: TxType) {
  const t = (type ?? '').toLowerCase() as TxType;
  if (DEBIT_TYPES.has(t)) return true;
  if (CREDIT_TYPES.has(t)) return false;
  // fallback: si no lo conocemos, asumimos crédito (para no pintar rojo por error)
  return false;
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(n);
}

export function formatDay(dateISO: string | number | Date) {
  const d = new Date(dateISO);
  // fuerza AR para que salga "domingo", "lunes", etc.:
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    timeZone: 'America/Argentina/Buenos_Aires',
  });
}
 */
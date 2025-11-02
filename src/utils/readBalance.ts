export function readBalance(acc: unknown): number {
  const a = acc as any;
  const candidates = [a?.available_amount];
  for (const v of candidates) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

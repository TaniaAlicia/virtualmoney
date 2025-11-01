export function detectBrandFromNumber(num?: string | number): string | null {
  if (!num) return null;
  const s = String(num);

  if (/^4\d{12,18}$/.test(s)) return "Visa"; // 4...
  const iin6 = parseInt(s.slice(0, 6), 10);
  const iin2 = parseInt(s.slice(0, 2), 10);
  if ((iin2 >= 51 && iin2 <= 55) || (iin6 >= 222100 && iin6 <= 272099))
    return "MasterCard"; // 51–55, 2221–2720
  if (/^(34|37)\d{13}$/.test(s)) return "American Express"; // 34/37

  return null;
}

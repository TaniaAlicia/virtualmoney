import * as yup from "yup";

const onlyDigits = (s: string) => (s || "").replace(/\D/g, "");
const STRICT = process.env.NEXT_PUBLIC_STRICT_CARD_VALIDATION === "true";

function luhnCheck(num: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function expiryNotPast(value?: string) {
  if (!value) return false;
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mm = parseInt(m[1], 10);
  const yy = parseInt(m[2], 10);
  const year = 2000 + yy;
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const expMonth = new Date(year, mm - 1, 1);
  return expMonth >= thisMonth;
}

export const CardScheme = yup.object({
  numberCard: yup
    .string()
    .required("Ingresa el número")
    .test("digits", "Debe tener 16 dígitos", v => onlyDigits(v || "").length === 16)
    .test("luhn", "Número inválido", (v) => !STRICT || luhnCheck(onlyDigits(v || ""))),
  nameTitular: yup
    .string()
    .required("Ingresa el nombre y apellido")
    .min(3, "Muy corto"),
  expirationDate: yup
    .string()
    .required("Ingresa MM/YY")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY")
    .test("future", "La tarjeta está vencida", expiryNotPast),
  securityCode: yup
    .string()
    .required("Ingresa el código")
    .matches(/^\d{3}$/, "Debe tener 3 dígitos")
});

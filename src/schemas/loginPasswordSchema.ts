import * as yup from "yup";

export const loginPasswordSchema = yup.object({
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Máximo 20 caracteres"),
});

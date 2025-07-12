import * as yup from "yup";

export const loginEmailSchema = yup.object({
  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Correo inválido"),
});

import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "Mínimo 2 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, "Solo letras y espacios"),

  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "Mínimo 2 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'-]+$/, "Solo letras y espacios"),

  dni: yup
    .string()
    .required("El DNI es obligatorio")
    .matches(/^\d{6,15}$/, "Debe contener solo números (6-15 dígitos)"),

  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Correo inválido"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/, "Debe contener una mayúscula, un número y un carácter especial"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),

  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^\d{6,15}$/, "Debe contener solo números (6-15 dígitos)"),
});

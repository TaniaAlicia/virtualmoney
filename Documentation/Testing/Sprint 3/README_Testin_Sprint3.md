# 🧪 Plan de pruebas - Sprint 3

Este directorio contiene la planilla con los **casos de prueba manuales** ejecutados en el **Sprint 3**.  
Incluye funcionalidades relacionadas a la épica **Ingreso de dinero** (flujo desde tarjeta de crédito/débito).  
Los casos están clasificados en suites de **Smoke** y **Regression**.

---

## ✍️ Cómo escribir un caso de prueba

Cada caso de prueba documenta los pasos necesarios para validar una funcionalidad, junto con su resultado esperado y estado final.

**Estructura:**

- **ID del caso:** identificador único (ej. TC017)
- **Funcionalidad:** módulo o flujo probado (ej. Ingreso de dinero)
- **Caso de prueba:** título breve y descriptivo
- **Pasos:** secuencia clara y numerada para ejecutar la prueba
- **Resultado esperado:** comportamiento esperado del sistema
- **Estado:** resultado tras la ejecución (`✅ ok / ❌ fail`)
- **Observaciones:** notas adicionales o anomalías detectadas
- **Fecha:** día de ejecución
- **Test suite:** tipo de prueba (`Smoke` o `Regression`)

💡 *Ejemplo:*

- **ID:** TC017  
- **Funcionalidad:** Ingreso de dinero  
- **Caso de prueba:** Selección de tarjeta válida  
- **Pasos:**  
   1. Ir a la sección *Ingresar dinero*  
   2. Seleccionar una tarjeta  
   3. Hacer clic en “Continuar”  
- **Resultado esperado:** La tarjeta se selecciona correctamente y se redirige a la pantalla de ingreso de monto  

---

## ✅ Cómo reportar un defecto

En caso de detectar un comportamiento no esperado:

1. Crear un **Issue en Jira** con tipo `bug`.
2. Incluir los siguientes datos:
   - Pasos para reproducir el error  
   - Resultado esperado vs. resultado actual  
   - Captura o evidencia visual (si aplica)
3. Asignar el ticket al miembro correspondiente del equipo (QA o Dev).

---

## 🔍 Suites definidas

### 🧩 Smoke test
Casos críticos que validan el flujo principal del ingreso de dinero:
- Selección de tarjeta válida  
- Ingreso de monto válido  
- Confirmación y pantalla de éxito  

### 🧪 Regression test
Casos secundarios o alternativos que validan errores y validaciones:
- Intento de continuar sin seleccionar tarjeta  
- Intento de continuar sin monto  
- Validación de caracteres inválidos  
- Error simulado de depósito  

---

📁 **Archivo de pruebas:**  
[`CasosDePrueba_Integrado_Sprint3.xlsx`](./CasosDePrueba_Integrado_Sprint3.xlsx)

🗓 **Fecha de ejecución:** 12/10/2025  
👩‍💻 **Tester:** _Tania Rodríguez García_

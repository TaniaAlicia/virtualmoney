# 🧪 Plan de pruebas - Sprint 4

Este directorio contiene la planilla con los **casos de prueba manuales** ejecutados en el **Sprint 4**.  
Incluye funcionalidades relacionadas a la épica **Pago de servicios** (flujo completo desde selección hasta confirmación).  
Los casos están clasificados en suites de **Smoke** y **Regression**.

---

## ✍️ Cómo escribir un caso de prueba

Cada caso de prueba documenta los pasos necesarios para validar una funcionalidad, junto con su resultado esperado y estado final.

**Estructura:**

- **ID del caso:** identificador único (ej. TC030)
- **Funcionalidad:** módulo o flujo probado (ej. Pago de servicios)
- **Caso de prueba:** título breve y descriptivo
- **Pasos:** secuencia clara y numerada para ejecutar la prueba
- **Resultado esperado:** comportamiento esperado del sistema
- **Estado:** resultado tras la ejecución (`✅ ok / ❌ fail`)
- **Observaciones:** notas adicionales o anomalías detectadas
- **Fecha:** día de ejecución
- **Test suite:** tipo de prueba (`Smoke` o `Regression`)

💡 *Ejemplo:*

- **ID:** TC030  
- **Funcionalidad:** Pago de servicios  
- **Caso de prueba:** Visualización de servicios disponibles  
- **Pasos:**  
   1. Ir a la sección *Pagar servicios*  
   2. Observar la lista de servicios  
- **Resultado esperado:** Se muestran los servicios disponibles como Netflix, Disney+, etc.

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
Casos críticos que validan el flujo principal del pago de servicios:
- Visualización de servicios disponibles  
- Ingreso válido de número de cuenta  
- Selección del medio de pago  
- Confirmación y pantalla de éxito

### 🧪 Regression test
Casos secundarios o alternativos que validan errores y validaciones:
- Validación de cuenta inválida  
- Error al intentar pagar  
- Búsqueda de servicio por nombre

---

📁 **Archivo de pruebas:**  
[`CasosDePrueba_Integrado_Sprint4.xlsx`](./CasosDePrueba_Integrado_Sprint4.xlsx)

🗓 **Fecha de ejecución:** 02/11/2025  
👩‍💻 **Tester:** _Tania Rodríguez García_

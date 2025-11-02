# 🧭 Testing Exploratorio - Sprint 4

**Objetivo:**  
Detectar errores fuera de los caminos previstos o no cubiertos por los casos de prueba estructurados.

**Fecha:** 02/11/2025  
**Tester:** Tania Rodríguez García

---

## 🧪 Sesiones / Tours realizados

**Tour 1 - Pago sin tarjetas cargadas**  
- **Descripción:** Intenté realizar un pago de servicio sin tener tarjetas registradas.  
- **Resultado:** Se muestra mensaje indicando que no hay tarjetas disponibles. ✅  

---

**Tour 2 - Pago de servicio sin costo desde backend**  
- **Descripción:** Seleccioné un servicio cuyo backend no devuelve monto para pagar.  
- **Resultado:** Se muestra un mensaje, pero no se redirige a una página clara de error. ⚠️  

---

## 🐞 Hallazgos encontrados

**EXP-01 - Usabilidad**  
- **Hallazgo:** El mensaje mostrado al pagar un servicio sin monto no es claro ni redirige correctamente.  
- **Estado:** A revisar

---

## 📌 Observaciones

- No se detectaron errores funcionales críticos.
- El flujo de pagos contempla correctamente la ausencia de tarjetas.
- Se recomienda mejorar el manejo de errores cuando el monto del servicio no se obtiene correctamente.
- No se reportaron bugs en Jira, pero se documentó un hallazgo de mejora.

---

🗓 **Sesiones realizadas:** 2  
🔍 **Hallazgos documentados:** 1

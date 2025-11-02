# Plan de pruebas - Sprint 2

Este directorio contiene la planilla con los casos de prueba manuales ejecutados en el Sprint 2.  
Incluye funcionalidades relacionadas a **gestión de medios de pago**: agregar, listar y eliminar tarjetas.  
Los casos están clasificados en suites de **Smoke** y **Regression**.

---

## ✍️ Cómo escribir un caso de prueba

Un caso de prueba debe contener la siguiente información:

- **ID del caso**: identificador único (ej. TC011)
- **Funcionalidad**: módulo o funcionalidad que se está probando (ej. Medios de pago)
- **Título del caso de prueba**: breve y descriptivo (ej. Alta de tarjeta con datos válidos)
- **Pasos**: secuencia clara y numerada para ejecutar la prueba.
- **Resultado esperado**: comportamiento esperado del sistema.
- **Estado**: resultado tras ejecutar el caso (✅ ok / ❌ fail).
- **Observaciones**: notas adicionales o anomalías detectadas.
- **Fecha**: día de ejecución.
- **Test suite**: a qué suite pertenece (Smoke o Regression).

💡 *Ejemplo*:

- **ID**: TC011  
- **Funcionalidad**: Medios de pago  
- **Caso de prueba**: Alta de tarjeta con datos válidos  
- **Pasos**:  
   1. Ir a la sección de Medios de Pago  
   2. Hacer clic en "Alta de tarjeta"  
   3. Ingresar datos válidos  
   4. Confirmar alta  
- **Resultado esperado**: La tarjeta se agrega y aparece en la lista  

---

## ✅ Cómo reportar un defecto

1. Crear un Issue en Jira con tipo `bug`.
2. Incluir lo siguiente:
   - Pasos para reproducir el error
   - Resultado esperado vs. resultado actual
   - Captura de pantalla o evidencia (si aplica)
3. Asignar al miembro del equipo correspondiente (QA o dev).

---

## 🔍 Suites definidas

### Smoke test
Casos críticos que validan las funcionalidades esenciales del sistema:
- Alta de tarjeta con datos válidos
- Visualización de la lista de tarjetas

### Regression test
Casos que validan escenarios alternativos y errores comunes:
- Límite de 10 tarjetas
- Detección automática del tipo de tarjeta
- Eliminación de tarjeta
- Eliminación de última tarjeta

---

📁 Archivo de pruebas: `CasosDePrueba_Integrado_Sprint2.xlsx`

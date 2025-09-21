# Plan de pruebas - Sprint 1

Este directorio contiene la planilla con los casos de prueba manuales ejecutados en el Sprint 1.  
Incluye funcionalidades de login, logout y registro, clasificadas en suites de **Smoke** y **Regression**.

---

## ✍️ Cómo escribir un caso de prueba

Un caso de prueba debe contener la siguiente información:

-ID del caso: identificador único (ej. TC001)

-Funcionalidad: módulo o funcionalidad que se está probando (ej. Login)

-Título del caso de prueba: breve y descriptivo (ej. Login exitoso con credenciales válidas)

-Pasos: secuencia clara y numerada para ejecutar la prueba.

-Resultado esperado: comportamiento esperado del sistema.

-Estado: resultado tras ejecutar el caso (✅ ok / ❌ fail).

-Observaciones: notas adicionales o anomalías detectadas.

-Fecha: día de ejecución.

-Test suite: a qué suite pertenece (Smoke o Regression).

💡 Ejemplo:

ID: TC001

Funcionalidad: Login

Caso de prueba: Login exitoso con credenciales válidas

Pasos:

Ir a la página de login

Ingresar usuario y contraseña válidos

Hacer clic en 'Iniciar sesión'

Resultado esperado: El usuario accede al dashboard

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
- Login exitoso
- Logout exitoso
- Registro exitoso

### Regression test
Casos que validan escenarios alternativos y errores comunes:
- Campos vacíos
- Validaciones de formato
- Contraseñas no coincidentes

---

📁 Archivo de pruebas: `CasosDePrueba_Integrado_Sprint1.xlsx`

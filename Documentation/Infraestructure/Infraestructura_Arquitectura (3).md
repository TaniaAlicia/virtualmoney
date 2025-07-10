# Documentación de Arquitectura - Infraestructura

## 🌐 Arquitectura técnica general

Este proyecto consta de dos partes principales:

- **Frontend**: construido con **Next.js**, alojado en GitHub y desplegado automáticamente en **Vercel**.
- **Backend**: una **API REST** documentada en **Swagger**, proporcionada de forma externa.

---

## 🔁 Comunicación entre componentes

- El navegador realiza solicitudes al frontend desplegado en Vercel.
- El frontend hace peticiones HTTP a la API externa basada en Swagger.
- No se utilizan microservicios ni servidores dedicados.

---

## 🧩 Boceto de red

┌────────────┐
│ Navegador  │
└────┬───────┘
     │ HTTP
     ▼
┌────────────────────────────┐
│ Vercel (Frontend - Next.js)│
└────┬───────────────────────┘
     │ HTTP requests (fetch)
     ▼
┌────────────────────────────┐
│ API REST (Swagger backend) │
└────────────────────────────┘

---

## 📁 Ubicación del despliegue

| Componente | Tecnología | Plataforma | URL |
|------------|------------|------------|-----|
| Frontend   | Next.js    | Vercel     | https://virtualmoney1-zw6w.vercel.app|
| Backend    | Swagger    | Externo    | https://digitalmoney.digitalhouse.com/swagger/index.html |

---

## ✅ Notas adicionales

- Docker para contenerizar el frontend en producción. Tener docker desktop instalado.
- Toda la lógica del backend ya está disponible, no se requiere despliegue local.

--- Comandos para despliegue docker
docker build -t my-frontend .
docker run -p 3000:3000 my-frontend



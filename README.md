# 💰 Digital Money House

![Portada del proyecto](./public/images/portada-dmh.png)

**Nuestra billetera digital**  
**Proyecto Integrador – Especialidad FrontEnd**  
**Tania Alicia Rodríguez García**

---

## 📖 Descripción

**Digital Money House** es una billetera virtual que permite a los usuarios realizar operaciones financieras cotidianas como transferencias, pagos y carga de saldo. Fue desarrollada como parte del proyecto final de la carrera **Front-End Developer** de Digital House, con foco en usabilidad, responsive design y buenas prácticas de desarrollo.

---

## 🚀 Tecnologías utilizadas

### 🧱 Frameworks y Lenguajes
- **Next.js** – Framework de React para aplicaciones modernas.
- **React** – Librería base para construir interfaces.
- **TypeScript** – Tipado estático para robustez y escalabilidad.

### 🎨 UI y Estilos
- **Tailwind CSS** – Estilos utility-first para desarrollo ágil y responsive.
- **@tailwindcss/forms** – Plugin para estilos accesibles en formularios.
- **Lucide React** – Íconos modernos y personalizables.

### 🧾 Manejo de Formularios y Validación
- **React Hook Form** – Librería para manejar formularios de manera performante.
- **Yup** – Validaciones declarativas y robustas integradas con RHF.

### 🔗 Fetching y Datos
- **Axios** – Cliente HTTP para conectarse con APIs REST.
      - **React Query** – Sincronización, caching y estado de datos remoto.

### 🧠 Estado Global
     - **Zustand** – Store global liviano y flexible para manejar estados.

### 🔐 Autenticación y Seguridad
- **js-cookie** – Manejo de tokens de sesión en cookies seguras.
- **jwt-decode** – Decodificación de tokens JWT en el cliente.

### 🧹 Code Style y Herramientas de Desarrollo
- **ESLint** – Linter para mantener calidad de código.
- **Prettier** – Formateador automático para estilos consistentes.


---

## 🗂️ Estructura del proyecto

```
digital-money-house/
├── public/
│   └── images/               # Recursos estáticos (logos, imágenes)
├── src/
│   ├── app/                  # Rutas y páginas (Next.js App Router)
│   ├── components/           # Componentes reutilizables
│   ├── context/              # Estados globales con Zustand / Context
│   ├── data/                 # Datos mockeados, opciones y constantes
│   ├── hooks/                # Hooks personalizados
│   ├── schemes/              # Validaciones con Yup
│   ├── services/             # Conexiones a la API
│   ├── types/                # Tipos personalizados (TypeScript)
│   └── utils/                # Funciones utilitarias (formateo, etc.)
├── .env.local                # Variables de entorno
├── package.json              # Dependencias y scripts del proyecto
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
└── README.md                 # Documentación del proyecto
```

---

## ✅ Funcionalidades principales

- Registro e inicio de sesión con autenticación por token.
- Gestión de tarjetas y perfil del usuario.
- Carga de dinero y pagos de servicios.
- Visualización de la actividad financiera con filtros.
- Copia rápida de alias y CVU.
- Diseño responsive, accesible y moderno.

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/TaniaAlicia/virtualmoney

```

### 2️⃣ Instala las dependencias

```bash
npm install
```

### 3️⃣ Configura las variables de entorno

Crea un archivo `.env.local` con el siguiente contenido:

```env
NEXT_PUBLIC_API_URL="https://digitalmoney.digitalhouse.com/api"

```

### 4️⃣ Ejecuta el servidor de desarrollo

```bash
npm run dev
```

Luego abre tu navegador en [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Autora

Este proyecto fue realizado por **Tania Alicia Rodríguez García**, como parte del desafío integrador de la especialidad **FrontEnd Developer** en Digital House.



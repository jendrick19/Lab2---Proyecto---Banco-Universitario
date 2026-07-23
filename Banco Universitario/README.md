# Banco Universitario — Aplicación Web de Banca

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5+-4fc08d.svg?style=flat-square)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0+-646cff.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-06b6d4.svg?style=flat-square)](https://tailwindcss.com/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-5.0-35495e.svg?style=flat-square)](https://router.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.18-5a29e4.svg?style=flat-square)](https://axios-http.com/)

Repositorio oficial del frontend del **Banco Universitario**. Este proyecto ha sido desarrollado como parte de las actividades prácticas de la asignatura **Laboratorio II**, e incluye tanto un sitio web público (landing) como una **plataforma de banca autenticada** para los usuarios registrados.

La aplicación implementa una arquitectura modular en Vue 3 y una interfaz responsiva de alto rendimiento sincronizada con las especificaciones de diseño definidas en Figma. La capa de banca consume una **API REST externa** mediante Axios, con autenticación por token JWT.

---

## 1. Tecnologías y Librerías

El sistema está construido sobre el siguiente stack de tecnologías:

*   **Vue 3 (Composition API / `<script setup>`):** Framework de componentes reactivos.
*   **Vite 7:** Entorno de compilación y empaquetado optimizado con Hot Module Replacement (HMR).
*   **Tailwind CSS v4:** Motor de estilos en tiempo de compilación para el desarrollo de la interfaz responsiva.
*   **Vue Router 5:** Gestor oficial de enrutamiento con comportamiento de desplazamiento suavizado (`scrollBehavior`) para enlaces con anclas (#) y guardas de navegación para rutas protegidas.
*   **Axios:** Cliente HTTP para el consumo de la API REST, con interceptores para la inyección automática del token JWT y el manejo de sesiones expiradas (401).
*   **Lucide Vue Next:** Librería de iconos vectoriales ligeros.

---

## 2. Identidad Visual y Parámetros de Diseño

La interfaz gráfica sigue un sistema de diseño estricto definido en `src/assets/main.css`:

*   **Tipografía:** `Montserrat Alternates` (cargada dinámicamente desde Google Fonts).
*   **Paleta de Colores:**
    *   **Color Primario:** `#085f63` (Tono esmeralda oscuro, empleado en textos principales, botones destacados e identidad corporativa).
    *   **Color Secundario:** `#49beb7` (Tono cian medio, utilizado para acentos, iconos y elementos interactivos secundarios).
    *   **Neutros y Fondos:** Degradados suaves basados en `#ffffff` y `#f9fafb` para mejorar la legibilidad y la fatiga visual.
*   **Transiciones:** Efectos de interactividad unificados mediante la directiva `transition-all duration-300` aplicada en estados activos y hovers de tarjetas y botones.

---

## 3. Arquitectura de Módulos

La aplicación se organiza por dominios de negocio (`src/modules/`). Cada módulo agrupa sus vistas, componentes, rutas y servicios de API.

### 3.1 Sitio público (`landing`)

Landing page pública compuesta por secciones modulares reutilizables:

1.  **Inicio (Hero):** Propuesta de valor inicial y botón de acción principal para registro de usuarios.
2.  **Servicios:** Tarjetas de información sobre transacciones sin comisión, depósitos, retiros, pago de matrícula y cobro de becas.
3.  **Institucional (Nosotros):** Misión, visión y objetivos estratégicos de la entidad bancaria.
4.  **Estadísticas (Stats):** Métricas clave y beneficios del banco en el sector universitario.
5.  **Testimonios:** Opiniones de estudiantes integradas de forma estática.
6.  **Preguntas Frecuentes (FAQ):** Componente interactivo tipo acordeón.
7.  **Contacto:** Vista con formulario de validación dinámica en el frontend.

### 3.2 Plataforma de banca (autenticada)

Módulos que consumen la API REST y quedan protegidos tras el login mediante la guarda de navegación (`app/router/authGuard.js`):

*   **Auth (`auth`):** Vistas de *Login*, *Registro* y *Restablecer contraseña*. La sesión (token JWT) se persiste con `shared/utils/authStorage.js` y se inyecta en cada petición vía `shared/utils/apiClient.js`.
*   **Dashboard (`dashboard`):** Panel principal con tarjeta de saldo, datos de cuenta, listado de transacciones e historial de movimientos.
*   **Transferencias (`transfer`):** Flujo de envío de dinero con estado de carga y modal de confirmación de éxito.
*   **Contactos (`contacts`):** Gestión de contactos frecuentes del usuario para transferencias.
*   **Perfil (`profile`):** Consulta de los datos personales y del número de cuenta, y cambio de la contraseña de acceso.

---

## 4. Estructura de Directorios

El repositorio organiza el código fuente bajo el estándar modular por dominios:

```text
Banco Universitario/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── app/                # Configuración global de la aplicación
│   │   ├── layouts/        # Layouts compartidos (PublicLayout)
│   │   └── router/         # Enrutamiento (index.js) y guarda de auth (authGuard.js)
│   ├── assets/             # Estilos globales y tokens del tema (main.css)
│   ├── modules/            # Módulos por dominio de negocio (views, components, routes, services)
│   │   ├── auth/           # Login, Registro y Restablecer contraseña + authService
│   │   ├── dashboard/      # Panel, saldo, cuenta, transacciones e historial + dashboardService
│   │   ├── transfer/       # Flujo de transferencias + transferService
│   │   ├── contacts/       # Gestión de contactos frecuentes
│   │   ├── profile/        # Perfil del usuario
│   │   └── landing/        # Landing Page pública (Hero, FAQ, Servicios, Contacto, etc.)
│   ├── shared/             # Recursos genéricos y utilidades compartidas
│   │   ├── components/     # UI reutilizable (AppButton, AppInputField), forms y layout
│   │   └── utils/          # apiClient.js (Axios+JWT), authStorage.js, validaciones
│   ├── App.vue             # Componente raíz de Vue
│   └── main.js             # Punto de entrada: crea la app y monta el router
├── index.html              # Plantilla HTML base del navegador
├── package.json            # Configuración de dependencias y scripts npm
└── vite.config.js          # Configuración del compilador Vite
```

---

## 5. Sistema de Validación del Formulario de Contacto

El formulario de contacto aplica validación en tiempo real en el frontend mediante el script de utilidad `contactFormValidation.js` para asegurar la calidad de los datos de entrada:

| Campo | Regla de Validación | Mensaje de Error Emitido |
| :--- | :--- | :--- |
| **Nombre** | • Requerido<br>• Entre 2 y 80 caracteres<br>• Solo caracteres alfabéticos y espacios | *«El nombre es obligatorio.»*<br>*«El nombre debe tener al menos 2 caracteres.»*<br>*«El nombre solo puede contener letras y espacios.»* |
| **Correo** | • Requerido<br>• Formato de email válido (expresión regular)<br>• Máximo 120 caracteres | *«El correo es obligatorio.»*<br>*«Ingresa un correo electrónico válido.»* |
| **Asunto** | • Requerido<br>• Entre 3 y 100 caracteres | *«El asunto es obligatorio.»*<br>*«El asunto debe tener al menos 3 caracteres.»* |
| **Mensaje** | • Requerido<br>• Entre 10 y 1000 caracteres | *«El mensaje es obligatorio.»*<br>*«El mensaje debe tener al menos 10 caracteres.»* |

---

## 6. Instalación y Configuración del Entorno

### Requisitos del Entorno

Es necesario contar con Node.js en alguna de las siguientes versiones:
*   Node.js `^20.19.0` o `>=22.12.0`

### Paso 1: Clonar e instalar dependencias

```bash
# Clonación del repositorio
git clone https://github.com/jendrick19/Lab2---Proyecto---Banco-Universitario.git

# Acceso al directorio del proyecto
cd "Banco Universitario"

# Instalación de paquetes mediante npm
npm install
```

### Paso 2: Configuración de la API

La plataforma de banca consume una **API REST externa**. La URL se define mediante la variable de entorno `VITE_API_URL`; si no se especifica, se usa `http://localhost:3000` por defecto.

Cree un archivo `.env` en la raíz del proyecto para apuntar a su instancia de la API:

```bash
# .env
VITE_API_URL=http://localhost:3000
```

### Paso 3: Servidor de Desarrollo

Inicie el entorno local de desarrollo con soporte para recarga en caliente (HMR):

```bash
npm run dev
```

La consola indicará la dirección IP local (típicamente `http://localhost:5173`) para visualizar la aplicación.

### Paso 4: Compilación para Producción

Para compilar y empaquetar los archivos de producción de manera optimizada:

```bash
# Compilar archivos de distribución en la carpeta /dist
npm run build

# Previsualizar de manera local el entorno de producción
npm run preview
```

---

## 7. Información Académica y Autores

*   **Institución:** Banco Universitario
*   **Asignatura:** Laboratorio II
*   **Tipo de Proyecto:** Aplicación Web de Banca (Landing + Plataforma autenticada) — Fin de Ciclo

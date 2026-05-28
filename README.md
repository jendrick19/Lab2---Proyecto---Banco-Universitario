# Banco Universitario — Plataforma de Landing Page

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5+-4fc08d.svg?style=flat-square)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0+-646cff.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06b6d4.svg?style=flat-square)](https://tailwindcss.com/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-5.0-35495e.svg?style=flat-square)](https://router.vuejs.org/)


Repositorio oficial de la Landing Page del **Banco Universitario**. Este proyecto ha sido desarrollado como parte de las actividades prácticas de la asignatura **Laboratorio II**, sirviendo como sitio web público e interactivo orientado a la comunidad académica y estudiantil.

La aplicación implementa una arquitectura modular en Vue 3 y una interfaz responsiva de alto rendimiento sincronizada con las especificaciones de diseño definidas en Figma.

---

## 1. Tecnologías y Librerías

El sistema está construido sobre el siguiente stack de tecnologías:

*   **Vue 3 (Composition API / `<script setup>`):** Framework de componentes reactivos.
*   **Vite 7:** Entorno de compilación y empaquetado optimizado con Hot Module Replacement (HMR).
*   **Tailwind CSS v4:** Motor de estilos en tiempo de compilación para el desarrollo de la interfaz responsiva.
*   **Vue Router 5:** Gestor oficial de enrutamiento con comportamiento de desplazamiento suavizado (`scrollBehavior`) para enlaces con anclas (#).
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

## 3. Arquitectura de Módulos y Secciones

La aplicación se estructura en base a componentes modulares altamente reutilizables:

1.  **Sección de Inicio (Hero):** Propuesta de valor inicial y botón de acción principal para registro de usuarios.
2.  **Sección de Servicios:** Tarjetas de información sobre transacciones sin comisión, depósitos, retiros, pago de matrícula y cobro de becas.
3.  **Sección Institucional (Nosotros):** Declaración formal de la misión, visión y objetivos estratégicos de la entidad bancaria.
4.  **Estadísticas e Indicadores (Stats):** Métricas clave y beneficios del banco en el sector universitario.
5.  **Testimonios:** Opiniones de estudiantes integradas de forma estática para validación de experiencia.
6.  **Preguntas Frecuentes (FAQ):** Componente interactivo tipo acordeón para la resolución de dudas frecuentes.
7.  **Formulario de Contacto:** Vista con validación dinámica de entradas en el frontend.
8.  **Módulos de Autenticación (Auth):** Vistas de *Login* y *Registro* maquetadas para futura integración con servicios de backend.

---

## 4. Estructura de Directorios

El repositorio organiza el código fuente bajo el estándar modular por dominios:

```text
Banco Universitario/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── app/                # Configuración global de la aplicación
│   │   ├── layouts/        # Layouts compartidos (PublicLayout)
│   │   └── router/         # Configuración de rutas (Vue Router)
│   ├── assets/             # Estilos globales y tokens del tema (main.css)
│   ├── modules/            # Módulos específicos por dominio de negocio
│   │   ├── auth/           # Módulo de Autenticación (Login, Registro)
│   │   │   └── views/      # Vistas del módulo de autenticación
│   │   └── landing/        # Módulo de la Landing Page pública
│   │       ├── components/ # Secciones de la Landing (Hero, FAQ, Servicios, etc.)
│   │       └── routes/     # Definición de rutas del módulo
│   ├── shared/             # Recursos genéricos y utilidades compartidas
│   │   ├── components/     # Componentes de UI reutilizables (AppButton, AppInputField)
│   │   └── utils/          # Utilidades globales (validación de formulario)
│   ├── App.vue             # Componente raíz de Vue
│   └── main.js             # Archivo de inicio del compilador
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

### Paso 2: Servidor de Desarrollo

Inicie el entorno local de desarrollo con soporte para recarga en caliente (HMR):

```bash
npm run dev
```

La consola indicará la dirección IP local (típicamente `http://localhost:5173`) para visualizar la aplicación.

### Paso 3: Compilación para Producción

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
*   **Tipo de Proyecto:** Landing Page — Fin de Ciclo
*   **Estudiante / Desarrollador:** Jendrick ([@jendrick19](https://github.com/jendrick19))

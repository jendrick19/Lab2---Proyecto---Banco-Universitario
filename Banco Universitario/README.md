# Banco Universitario — Landing

Sitio web público (landing) del Banco Universitario, desarrollado con Vue 3, Vite y Tailwind CSS.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview
```

Los archivos generados quedan en la carpeta `dist/`.

## Estructura del proyecto

```
src/
├── app/          # Router y layouts
├── modules/      # landing, auth
├── shared/       # Componentes UI, formularios, utilidades
└── assets/       # Estilos globales e imágenes
```

## Rutas principales

| Ruta        | Descripción              |
|-------------|--------------------------|
| `/`         | Landing (inicio)         |
| `/contacto` | Página de contacto       |
| `/login`    | Login (en construcción)  |
| `/registro` | Registro (en construcción) |

## Notas

- El formulario de contacto valida en el frontend; el envío al backend se integrará en una fase posterior.
- Colores de marca: primario `#085f63`, secundario `#49beb7` (definidos en `src/assets/main.css`).

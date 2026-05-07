# Banco Universitario - Laboratorio II

Frontend del proyecto **Banco Universitario**, desarrollado con **Vue 3 + Vite + Tailwind CSS 4**, siguiendo como referencia el diseño base trabajado en `Figma/src/app/components`.

## Estado del proyecto

Actualmente, en `Banco Universitario/src` se encuentran implementados:

- `AppHeader` (navegacion responsive con menu movil y CTAs).
- `AppHero` (seccion principal de bienvenida).
- `AppFooter` (redes sociales e identidad de marca).
- `AppButton` (componente reutilizable con variantes y tamanos alineados al diseno).

## Contexto de Figma (referencia funcional)

El prototipo de Figma contempla una landing mas completa con estas secciones:

- Header
- Hero
- Nosotros
- Services
- Benefits
- Stats
- Testimonials
- FAQ
- CTA
- Footer

Esa estructura sirve como guia para continuar la implementacion progresiva en Vue.

## Tecnologias

- Vue 3
- Vite
- Tailwind CSS 4
- Preline

## Estructura principal

```text
Proyecto/
├─ README.md
└─ Banco Universitario/
   ├─ package.json
   └─ src/
      ├─ App.vue
      ├─ main.js
      └─ components/
         ├─ layout/
         └─ ui/
```

## Requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Instalacion y ejecucion

Desde la raiz de este repositorio:

```bash
cd "Banco Universitario"
npm install
npm run dev
```

La app estara disponible en la URL local que indique Vite (normalmente `http://localhost:5173`).

## Scripts disponibles

Ejecutar dentro de `Banco Universitario/`:

- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de produccion.
- `npm run preview`: previsualizacion del build.

## Convencion de commits

Usar commits semanticos, por ejemplo:

- `feat:` nueva funcionalidad
- `fix:` correccion de errores
- `style:` cambios de estilos/formato sin logica
- `refactor:` mejora interna sin cambiar comportamiento
- `docs:` documentacion
- `chore:` tareas de mantenimiento
- `test:` pruebas

Ejemplo:

```text
feat: agregar seccion de nosotros en landing principal
```

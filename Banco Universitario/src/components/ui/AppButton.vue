<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'secondary', 'white'].includes(v),
  },
  href: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
})
</script>

<!--
  Tamaños según Figma:
    sm → px-4  py-1.5  text-sm                     (usos secundarios)
    md → px-6  py-2    text-base                    (header: Ingresar / Registrarse)
    lg → px-8  py-4    text-base font-semibold      (Hero, CTA, Login — botones de acción)

  Variantes:
    primary   → fondo #085f63, hover #49beb7
    outline   → borde #085f63, hover invertido
    secondary → fondo #49beb7 + sombra   (Hero)
    white     → fondo blanco, texto #085f63 + sombra (CTA sobre gradiente)
-->
<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href ?? undefined"
    :type="href ? undefined : type"
    class="inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-all focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
    :class="[
      size === 'sm' && 'px-4 py-1.5 text-sm',
      size === 'md' && 'px-6 py-2 text-base',
      size === 'lg' && 'px-8 py-4 text-base font-semibold',

      variant === 'primary'
        && 'bg-[#085f63] text-white border-2 border-[#085f63] hover:bg-[#49beb7] hover:border-[#49beb7] focus:bg-[#49beb7] focus:border-[#49beb7]',

      variant === 'outline'
        && 'border-2 border-[#085f63] text-[#085f63] hover:bg-[#085f63] hover:text-white focus:bg-[#085f63] focus:text-white',

      variant === 'secondary'
        && 'bg-[#49beb7] text-white border-2 border-[#49beb7] hover:bg-[#085f63] hover:border-[#085f63] focus:bg-[#085f63] shadow-lg hover:shadow-xl',

      variant === 'white'
        && 'bg-white text-[#085f63] border-2 border-white hover:bg-white/90 focus:bg-white/90 shadow-xl',
    ]"
  >
    <slot />
  </component>
</template>

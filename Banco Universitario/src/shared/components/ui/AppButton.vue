<script setup>
import { RouterLink } from 'vue-router'

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
  to: {
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

<template>
  <component
    :is="to ? RouterLink : href ? 'a' : 'button'"
    :to="to ?? undefined"
    :href="href ?? undefined"
    :type="to || href ? undefined : type"
    class="inline-flex items-center justify-center gap-x-2 rounded-lg font-medium transition-all focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    :class="[
      size === 'sm' && 'px-4 py-1.5 text-sm',
      size === 'md' && 'px-6 py-2 text-base',
      size === 'lg' && 'px-8 py-4 text-base font-semibold',

      variant === 'primary'
        && 'border-2 border-primary bg-primary text-white hover:border-secondary hover:bg-secondary focus:border-secondary focus:bg-secondary',

      variant === 'outline'
        && 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white',

      variant === 'secondary'
        && 'border-2 border-secondary bg-secondary text-white shadow-lg hover:border-primary hover:bg-primary hover:shadow-xl focus:bg-primary',

      variant === 'white'
        && 'border-2 border-white bg-white text-primary shadow-xl hover:bg-white/90 focus:bg-white/90',
    ]"
  >
    <slot />
  </component>
</template>

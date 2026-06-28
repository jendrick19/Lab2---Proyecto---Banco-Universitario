<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <div class="flex flex-col items-center gap-8">
      <!-- Spinner -->
      <div class="relative flex items-center justify-center">
        <div class="absolute w-20 h-20 rounded-full border-4 border-white/10"></div>
        <div
          class="w-20 h-20 rounded-full border-4 border-transparent border-t-secondary border-r-secondary animate-spin"
        ></div>
      </div>

      <!-- Mensaje -->
      <p class="text-white text-lg font-medium text-center px-4">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: 'Procesando transferencia segura...',
  },
})
</script>

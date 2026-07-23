<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  message: String
})

const emit = defineEmits(['close'])

onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, 3000)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
    <span class="font-medium">{{ message }}</span>
    <button @click="$emit('close')" class="text-white hover:text-green-100 transition-colors ml-2" title="Cerrar">
      &times;
    </button>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup>
defineProps({
  open: Boolean,
  contactName: String
})
defineEmits(['close', 'confirm'])
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
      <h2 class="text-xl font-bold text-gray-800 mb-2">Eliminar Contacto</h2>
      <p class="text-gray-600 mb-6">¿Estás seguro de que deseas eliminar a <strong>{{ contactName }}</strong>? Esta acción no se puede deshacer.</p>
      
      <div class="flex items-center justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
</template>

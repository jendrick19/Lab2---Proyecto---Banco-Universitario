<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  contact: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const alias = ref('')
const cuenta = ref('')
const descripcion = ref('')

watch(() => props.open, (newVal) => {
  if (newVal) {
    if (props.contact) {
      alias.value = props.contact.alias
      cuenta.value = props.contact.cuenta
      descripcion.value = props.contact.descripcion
    } else {
      alias.value = ''
      cuenta.value = ''
      descripcion.value = ''
    }
  }
})

const save = () => {
  emit('save', {
    alias: alias.value,
    cuenta: cuenta.value,
    descripcion: descripcion.value
  })
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full mx-4">
      <h2 class="text-xl font-bold text-gray-800 mb-4">{{ contact ? 'Editar Contacto' : 'Agregar Contacto' }}</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Alias</label>
          <input v-model="alias" type="text" placeholder="Ej. Juan Pérez" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
          <input v-model="cuenta" type="text" placeholder="20 dígitos" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="descripcion" rows="3" placeholder="Opcional" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"></textarea>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 mt-6">
        <button @click="$emit('close')" class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors">Cancelar</button>
        <button @click="save" class="px-4 py-2 rounded-lg text-white font-medium transition-colors" style="background-color: #085f63">Guardar</button>
      </div>
    </div>
  </div>
</template>

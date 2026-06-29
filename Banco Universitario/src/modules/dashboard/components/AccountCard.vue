<script setup>
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps({
  accountNumber: {
    type: String,
    default: ''
  }
})

const copied = ref(false)

const handleCopyAccount = async () => {
  if (!props.accountNumber) return
  
  try {
    await navigator.clipboard.writeText(props.accountNumber)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying text: ', err)
  }
}
</script>

<template>
  <div class="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-white shadow-lg" style="background-color: #085f63">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p class="text-sm text-white/80 mb-2">Tu Número de Cuenta</p>
        <p class="text-2xl font-mono font-semibold tracking-wider">
          {{ accountNumber }}
        </p>
      </div>
      <button
        @click="handleCopyAccount"
        class="px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
        :style="{ backgroundColor: copied ? '#22c55e' : '#49beb7', color: '#ffffff' }"
      >
        <template v-if="copied">
          <Check class="w-5 h-5" /> Copiado
        </template>
        <template v-else>
          <Copy class="w-5 h-5" /> Copiar
        </template>
      </button>
    </div>
  </div>
</template>

<template>
  <div v-if="open">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative" @click.stop>
        <!-- Ícono de éxito -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
        </div>

        <!-- Título -->
        <h2 class="text-2xl font-semibold text-center mb-2 text-primary">
          ¡Transferencia Exitosa!
        </h2>
        <p class="text-center text-gray-600 mb-8">
          Tu transacción se ha procesado correctamente
        </p>

        <!-- Resumen -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Receptor:</span>
            <span class="font-medium text-gray-900">{{ transferData.recipient }}</span>
          </div>
          <div class="h-px bg-gray-200"></div>
          <div class="flex justify-between">
            <span class="text-gray-600">Cuenta:</span>
            <span class="font-medium text-gray-900 font-mono text-sm">{{ transferData.account }}</span>
          </div>
          <div class="h-px bg-gray-200"></div>
          <div class="flex justify-between">
            <span class="text-gray-600">Monto:</span>
            <span class="font-semibold text-lg text-primary">Bs. {{ formattedAmount }}</span>
          </div>
          <div class="h-px bg-gray-200"></div>
          <div class="flex justify-between">
            <span class="text-gray-600">Fecha:</span>
            <span class="font-medium text-gray-900">{{ transferData.date }}</span>
          </div>
        </div>

        <!-- Botones -->
        <div class="space-y-3">
          <button
            type="button"
            @click="handleDownload"
            class="w-full py-3 rounded-lg font-semibold text-white bg-secondary hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Descargar Comprobante
          </button>

          <router-link
            to="/panel"
            @click="$emit('close')"
            class="w-full py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Volver al Inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  transferData: {
    type: Object,
    required: true,
    // { recipient, account, amount, date }
  },
})

defineEmits(['close'])

const formattedAmount = computed(() =>
  Number(props.transferData.amount).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
)

/*
 * handleDownload genera y descarga un comprobante de la transferencia en texto plano.
 */
const handleDownload = () => {
  const receipt = [
    'COMPROBANTE DE TRANSFERENCIA',
    'Banco Universitario',
    '',
    `Receptor: ${props.transferData.recipient}`,
    `Cuenta: ${props.transferData.account}`,
    `Monto: Bs. ${formattedAmount.value}`,
    `Fecha: ${props.transferData.date}`,
    '',
    'Transferencia realizada exitosamente.',
  ].join('\n')

  const blob = new Blob([receipt], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `comprobante_${props.transferData.date.replace(/[/:, ]/g, '_')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
</script>

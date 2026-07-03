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

        <!-- Agendar contacto -->
        <div class="mb-6">
          <!-- Ya está agendado (o quedó agendado tras guardar) -->
          <div
            v-if="alreadySaved"
            class="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm"
          >
            <UserCheck class="w-5 h-5 flex-shrink-0" />
            <span>Este beneficiario está en tus contactos.</span>
          </div>

          <!-- Ofrecer agendar -->
          <div v-else class="rounded-lg border border-gray-200 p-4">
            <div class="flex items-center gap-2 mb-3">
              <UserPlus class="w-5 h-5 text-secondary flex-shrink-0" />
              <p class="text-sm font-medium text-gray-700">¿Agendar este contacto?</p>
            </div>
            <input
              v-model="alias"
              type="text"
              maxlength="60"
              placeholder="Nombre para tu agenda (ej: Juan, Alquiler...)"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors mb-2"
              @keyup.enter="handleSaveContact"
            />
            <p v-if="saveError" class="text-sm text-red-600 mb-2">{{ saveError }}</p>
            <button
              type="button"
              :disabled="!alias.trim() || saving"
              @click="handleSaveContact"
              class="w-full py-2.5 rounded-lg font-medium text-secondary border border-secondary hover:bg-secondary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <UserPlus class="w-4 h-4" />
              {{ saving ? 'Guardando...' : 'Agendar contacto' }}
            </button>
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
import { ref, watch, computed } from 'vue'
import { UserPlus, UserCheck } from 'lucide-vue-next'

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
  alreadySaved: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
  saveError: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'save-contact'])

// Alias que el usuario asigna al agendar. Se precarga con el nombre real del
// beneficiario y se reinicia cada vez que se abre el modal.
const alias = ref('')

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      alias.value = props.transferData?.recipient !== 'Destinatario'
        ? props.transferData?.recipient ?? ''
        : ''
    }
  },
)

const handleSaveContact = () => {
  const value = alias.value.trim()
  if (!value || props.saving) return
  emit('save-contact', value)
}

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

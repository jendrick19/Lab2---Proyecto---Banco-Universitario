<script setup>
import { computed } from 'vue'
import { AlertTriangle, ArrowRight } from 'lucide-vue-next'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  details: {
    type: Object,
    required: true,
    // { recipient, account, amount, description }
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const formattedAmount = computed(() =>
  Number(props.details.amount).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
)

// Agrupa el número de cuenta de a 4 dígitos para facilitar la verificación visual.
const formattedAccount = computed(() =>
  props.details.account ? props.details.account.replace(/(.{4})/g, '$1 ').trim() : '',
)
</script>

<template>
  <div v-if="open">
    <!-- Overlay: no se cierra al hacer clic fuera para evitar confirmaciones accidentales -->
    <div class="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" @click.stop>
        <!-- Ícono de advertencia -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle class="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <!-- Título -->
        <h2 class="text-2xl font-semibold text-center mb-2 text-primary">
          Confirma tu transferencia
        </h2>
        <p class="text-center text-gray-600 mb-6">
          Revisa los datos antes de continuar. Esta operación
          <span class="font-semibold text-gray-800">no se puede revertir</span>.
        </p>

        <!-- Resumen -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
          <div class="flex justify-between gap-4">
            <span class="text-gray-600">Beneficiario:</span>
            <span class="font-medium text-gray-900 text-right">{{ details.recipient }}</span>
          </div>
          <div v-if="details.alias" class="h-px bg-gray-200"></div>
          <div v-if="details.alias" class="flex justify-between gap-4">
            <span class="text-gray-600">En tu agenda:</span>
            <span class="font-medium text-gray-900 text-right">{{ details.alias }}</span>
          </div>
          <div class="h-px bg-gray-200"></div>
          <div class="flex justify-between gap-4">
            <span class="text-gray-600">Cuenta:</span>
            <span class="font-medium text-gray-900 font-mono text-sm text-right break-all">
              {{ formattedAccount }}
            </span>
          </div>
          <div class="h-px bg-gray-200"></div>
          <div v-if="details.description" class="flex justify-between gap-4">
            <span class="text-gray-600">Concepto:</span>
            <span class="font-medium text-gray-900 text-right">{{ details.description }}</span>
          </div>
          <div v-if="details.description" class="h-px bg-gray-200"></div>
          <div class="flex justify-between items-center gap-4">
            <span class="text-gray-600">Monto:</span>
            <span class="font-semibold text-xl text-primary">Bs. {{ formattedAmount }}</span>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex flex-col gap-3">
          <button
            type="button"
            :disabled="loading"
            @click="emit('confirm')"
            class="w-full py-3 rounded-lg font-semibold text-white bg-primary hover:opacity-90 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{{ loading ? 'Procesando...' : 'Confirmar y transferir' }}</span>
            <ArrowRight v-if="!loading" class="w-5 h-5 flex-shrink-0" />
          </button>
          <button
            type="button"
            :disabled="loading"
            @click="emit('cancel')"
            class="w-full py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

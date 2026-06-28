<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getUser, clearSession } from '@/shared/utils/authStorage'
import { getBalance, createTransfer, getUserByAccount } from '../services/transferService'
import DashboardSidebar from '@/modules/dashboard/components/DashboardSidebar.vue'
import DashboardHeader from '@/modules/dashboard/components/DashboardHeader.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import TransferSuccessModal from '../components/TransferSuccessModal.vue'

const router = useRouter()
const user = getUser()

const availableBalance = ref(0)
const ownAccount = ref('')

const destinationAccount = ref('')
const amount = ref('')
const description = ref('')

const beneficiaryName = ref('') // Nombre del beneficiario si la cuenta existe.
const accountError = ref('') // Error de la cuenta destino (propia o inexistente).
const checkingAccount = ref(false) // true mientras se consulta al backend.

const isLoading = ref(false)
const showModal = ref(false)
const errorMessage = ref('')
const transferData = ref(null)

const showLogoutModal = ref(false)

onMounted(async () => {
  ownAccount.value = getUser()?.account_number ?? ''
  availableBalance.value = await getBalance()
})

// Valida la cuenta destino de forma reactiva apenas se completan los 20 dígitos:
// 1) comparación local instantánea contra la cuenta propia,
// 2) verificación del beneficiario contra el backend (con debounce).
let accountCheckTimer = null
let accountCheckToken = 0

watch(destinationAccount, (value) => {
  beneficiaryName.value = ''
  accountError.value = ''
  checkingAccount.value = false
  if (accountCheckTimer) clearTimeout(accountCheckTimer)

  if (value.length !== 20) return

  if (value === ownAccount.value) {
    accountError.value = 'La cuenta ingresada es de tu propiedad. Ingresa una cuenta distinta a la tuya.'
    return
  }

  checkingAccount.value = true
  const token = ++accountCheckToken
  accountCheckTimer = setTimeout(async () => {
    const beneficiary = await getUserByAccount(value)
    if (token !== accountCheckToken) return // Descarta respuestas obsoletas.
    checkingAccount.value = false
    if (!beneficiary) {
      accountError.value = 'La cuenta ingresada no corresponde a ningún beneficiario.'
    } else {
      beneficiaryName.value = `${beneficiary.first_name} ${beneficiary.last_name}`.trim()
    }
  }, 450)
})

// El monto es válido si está vacío o es mayor a 0 y no supera el saldo disponible.
const isAmountValid = computed(
  () =>
    amount.value === '' ||
    (parseFloat(amount.value) > 0 && parseFloat(amount.value) <= availableBalance.value),
)

// Solo se habilita el envío con un beneficiario confirmado y un monto válido.
const isFormActive = computed(
  () =>
    beneficiaryName.value !== '' &&
    !checkingAccount.value &&
    isAmountValid.value &&
    amount.value !== '',
)

const formattedBalance = computed(() =>
  Number(availableBalance.value).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
)

// Solo permite dígitos y limita a 20 caracteres mientras el usuario escribe.
const onAccountInput = (event) => {
  destinationAccount.value = event.target.value.replace(/\D/g, '').slice(0, 20)
}

const handleSubmit = async () => {
  errorMessage.value = ''
  if (!isFormActive.value) return

  isLoading.value = true
  try {
    await createTransfer({
      accountNumber: destinationAccount.value,
      amount: amount.value,
      description: description.value || 'Transferencia',
    })

    const date = new Date().toLocaleDateString('es-VE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    transferData.value = {
      recipient: beneficiaryName.value || 'Destinatario',
      account: destinationAccount.value,
      amount: amount.value,
      date,
    }

    showModal.value = true
    // Refresca el saldo tras la transferencia exitosa.
    availableBalance.value = await getBalance()
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const handleCloseModal = () => {
  showModal.value = false
  destinationAccount.value = ''
  amount.value = ''
  description.value = ''
  beneficiaryName.value = ''
  accountError.value = ''
}

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  clearSession()
  router.push('/iniciar-sesion')
}

const cancelLogout = () => {
  showLogoutModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-72">
      <DashboardHeader :user="user" />

      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl mx-auto px-8 py-8">
          <h1 class="text-3xl font-semibold mb-6 text-primary">Realizar Transferencia</h1>

          <!-- Saldo disponible -->
          <div class="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v3a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3V5"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">Tu saldo disponible</p>
                <p class="text-2xl font-semibold text-primary">Bs. {{ formattedBalance }}</p>
              </div>
            </div>
          </div>

          <!-- Formulario -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <!-- Error de la API -->
            <div
              v-if="errorMessage"
              class="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Cuenta destino -->
              <div>
                <label for="destinationAccount" class="block text-sm font-medium text-gray-700 mb-2">
                  Número de Cuenta
                </label>
                <input
                  id="destinationAccount"
                  type="text"
                  :value="destinationAccount"
                  @input="onAccountInput"
                  placeholder="Ingrese 20 dígitos"
                  maxlength="20"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border transition-colors outline-none',
                    accountError
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : beneficiaryName
                        ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                        : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20',
                  ]"
                />
                <p v-if="accountError" class="mt-1.5 text-sm text-red-600">{{ accountError }}</p>
                <p v-else-if="checkingAccount" class="mt-1.5 text-sm text-gray-500">Verificando cuenta...</p>
                <p v-else-if="beneficiaryName" class="mt-1.5 text-sm text-green-600">
                  Beneficiario: {{ beneficiaryName }}
                </p>
                <p v-else-if="destinationAccount.length > 0" class="mt-1.5 text-sm text-gray-500">
                  {{ destinationAccount.length }}/20 dígitos
                </p>
              </div>

              <!-- Monto -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
                  Monto a Transferir
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Bs.</span>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    v-model="amount"
                    placeholder="0.00"
                    :class="[
                      'w-full pl-12 pr-4 py-3 rounded-lg border transition-colors outline-none',
                      !isAmountValid
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20',
                    ]"
                  />
                </div>
                <p v-if="!isAmountValid && amount !== ''" class="mt-1.5 text-sm text-red-600">
                  El monto debe ser mayor a 0 y no superar tu saldo disponible
                </p>
              </div>

              <!-- Concepto -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                  Concepto / Descripción
                </label>
                <textarea
                  id="description"
                  v-model="description"
                  placeholder="Motivo de la transferencia"
                  rows="3"
                  maxlength="100"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <!-- Botón -->
              <div class="pt-4">
                <button
                  type="submit"
                  :disabled="!isFormActive || isLoading"
                  class="w-full py-4 rounded-lg font-semibold text-white bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ejecutar Transferencia
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

    <!-- Overlay de carga -->
    <LoadingOverlay :is-open="isLoading" />

    <!-- Modal de éxito -->
    <TransferSuccessModal
      v-if="transferData"
      :open="showModal"
      :transfer-data="transferData"
      @close="handleCloseModal"
    />

    <!-- Modal de cerrar sesión -->
    <div v-if="showLogoutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center">
      <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
        <h2 class="text-xl font-bold text-gray-800 mb-2">¿Cerrar Sesión?</h2>
        <p class="text-gray-600 mb-6">¿Estás seguro de que deseas salir de tu cuenta?</p>

        <div class="flex items-center justify-end gap-3">
          <button
            @click="cancelLogout"
            class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmLogout"
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            Sí, cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

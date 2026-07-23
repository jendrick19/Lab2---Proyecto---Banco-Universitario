<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-vue-next'
import { getUser, clearSession } from '@/shared/utils/authStorage'
import { getProfile, updatePassword } from '../services/profileService'
import DashboardSidebar from '@/modules/dashboard/components/DashboardSidebar.vue'
import DashboardHeader from '@/modules/dashboard/components/DashboardHeader.vue'
import SuccessAlert from '@/modules/contacts/components/SuccessAlert.vue'

const router = useRouter()
const showLogoutModal = ref(false)

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

// Perfil (RF-05). Se parte de la copia en localStorage para pintar de inmediato
// y se refresca contra la API al montar la vista.
const user = ref(getUser())
const isLoadingProfile = ref(false)
const profileError = ref('')

const fetchProfile = async () => {
  isLoadingProfile.value = true
  profileError.value = ''
  try {
    user.value = await getProfile()
  } catch (error) {
    profileError.value = error.message
  } finally {
    isLoadingProfile.value = false
  }
}

onMounted(fetchProfile)

const nombreCompleto = computed(() => {
  const nombre = `${user.value?.first_name ?? ''} ${user.value?.last_name ?? ''}`.trim()
  return nombre || '—'
})

// La API devuelve birth_date en ISO 8601 (UTC). Se leen los componentes en UTC
// para que la fecha no se desplace un día según la zona horaria del navegador.
const fechaNacimiento = computed(() => {
  const raw = user.value?.birth_date
  if (!raw) return '—'
  const fecha = new Date(raw)
  if (Number.isNaN(fecha.getTime())) return '—'
  const dia = String(fecha.getUTCDate()).padStart(2, '0')
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}/${fecha.getUTCFullYear()}`
})

const numeroCuenta = computed(() => user.value?.account_number ?? '—')

// Copiado del número de cuenta
const copied = ref(false)

const handleCopyAccount = async () => {
  const cuenta = user.value?.account_number
  if (!cuenta) return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(cuenta)
    } else {
      // Respaldo para navegadores sin Clipboard API o contextos no seguros.
      const textArea = document.createElement('textarea')
      textArea.value = cuenta
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    passwordError.value = 'No se pudo copiar el número de cuenta.'
  }
}

// Cambio de contraseña (RF-06). La API exige entre 8 y 16 caracteres.
const currentPassword = ref('')
const newPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const isSaving = ref(false)
const passwordError = ref('')
const alertMessage = ref('')
const showConfirmPasswordModal = ref(false)

const handlePasswordChange = () => {
  passwordError.value = ''

  if (!currentPassword.value || !newPassword.value) {
    passwordError.value = 'Por favor completa todos los campos.'
    return
  }

  if (newPassword.value.length < 8 || newPassword.value.length > 16) {
    passwordError.value = 'La nueva contraseña debe tener entre 8 y 16 caracteres.'
    return
  }

  if (newPassword.value === currentPassword.value) {
    passwordError.value = 'La nueva contraseña debe ser distinta de la actual.'
    return
  }

  showConfirmPasswordModal.value = true
}

const executePasswordChange = async () => {
  showConfirmPasswordModal.value = false
  isSaving.value = true
  try {
    await updatePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })
    currentPassword.value = ''
    newPassword.value = ''
    alertMessage.value = 'Contraseña actualizada exitosamente'
  } catch (error) {
    passwordError.value = error.message
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-72">
      <DashboardHeader :user="user" />

      <main class="flex-1 overflow-y-auto">
        <div class="max-w-5xl mx-auto px-8 py-8">
          <h1 class="text-3xl font-semibold mb-8" style="color: #085f63;">
            Mi Perfil y Seguridad
          </h1>

          <!-- Error al cargar el perfil -->
          <div
            v-if="profileError"
            class="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
          >
            <AlertCircle class="w-5 h-5 flex-shrink-0" />
            <span class="text-sm">{{ profileError }}</span>
            <button
              @click="fetchProfile"
              class="ml-auto text-sm font-semibold underline hover:no-underline"
            >
              Reintentar
            </button>
          </div>

          <div class="space-y-8">
            <!-- Información Personal -->
            <section>
              <h2 class="text-xl font-semibold mb-4" style="color: #085f63;">
                Información Personal
              </h2>

              <div v-if="isLoadingProfile" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="h-[92px] bg-white rounded-lg border border-gray-200 p-5 animate-pulse"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div class="flex-1 space-y-2 pt-1">
                      <div class="h-3 w-28 rounded bg-gray-200"></div>
                      <div class="h-4 w-40 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nombre Completo -->
                <div class="bg-white rounded-lg border border-gray-200 p-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <User class="w-5 h-5 text-secondary" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-600 mb-1">Nombre Completo</p>
                      <p class="text-base font-medium text-gray-900">{{ nombreCompleto }}</p>
                    </div>
                  </div>
                </div>

                <!-- Número de Documento -->
                <div class="bg-white rounded-lg border border-gray-200 p-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <CreditCard class="w-5 h-5 text-secondary" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-600 mb-1">Número de Documento</p>
                      <p class="text-base font-medium text-gray-900">
                        {{ user?.document_number || '—' }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Correo Electrónico -->
                <div class="bg-white rounded-lg border border-gray-200 p-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Mail class="w-5 h-5 text-secondary" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-600 mb-1">Correo Electrónico</p>
                      <p class="text-base font-medium text-gray-900 break-all">
                        {{ user?.email || '—' }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Teléfono -->
                <div class="bg-white rounded-lg border border-gray-200 p-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Phone class="w-5 h-5 text-secondary" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-600 mb-1">Teléfono</p>
                      <p class="text-base font-medium text-gray-900">
                        {{ user?.phone_number || '—' }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Fecha de Nacimiento -->
                <div class="bg-white rounded-lg border border-gray-200 p-5">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Calendar class="w-5 h-5 text-secondary" />
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-gray-600 mb-1">Fecha de Nacimiento</p>
                      <p class="text-base font-medium text-gray-900">{{ fechaNacimiento }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Información de Cuenta -->
            <section>
              <h2 class="text-xl font-semibold mb-4" style="color: #085f63;">
                Información de Cuenta
              </h2>
              <div
                class="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-white shadow-lg"
              >
                <div class="flex items-center justify-between gap-6">
                  <div>
                    <p class="text-sm text-white/80 mb-2">Tu Número de Cuenta</p>
                    <p class="text-2xl font-mono font-semibold tracking-wider">
                      {{ numeroCuenta }}
                    </p>
                    <p class="text-xs text-white/70 mt-2">Haz clic en el botón para copiar</p>
                  </div>
                  <button
                    @click="handleCopyAccount"
                    :disabled="!user?.account_number"
                    class="px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    :style="{ backgroundColor: copied ? '#22c55e' : '#49beb7' }"
                  >
                    <template v-if="copied">
                      <Check class="w-5 h-5" />
                      Copiado
                    </template>
                    <template v-else>
                      <Copy class="w-5 h-5" />
                      Copiar
                    </template>
                  </button>
                </div>
              </div>
            </section>

            <!-- Actualizar Contraseña -->
            <section>
              <h2 class="text-xl font-semibold mb-4" style="color: #085f63;">
                Actualizar Contraseña
              </h2>
              <div class="bg-white rounded-xl border border-gray-200 p-8">
                <form @submit.prevent="handlePasswordChange" class="space-y-6 max-w-2xl">
                  <!-- Contraseña Actual -->
                  <div>
                    <label
                      for="currentPassword"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Contraseña Actual
                    </label>
                    <div class="relative">
                      <div class="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock class="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="currentPassword"
                        v-model="currentPassword"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        autocomplete="current-password"
                        placeholder="Ingresa tu contraseña actual"
                        class="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                      />
                      <button
                        type="button"
                        @click="showCurrentPassword = !showCurrentPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        :title="showCurrentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                      >
                        <EyeOff v-if="showCurrentPassword" class="w-5 h-5" />
                        <Eye v-else class="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <!-- Nueva Contraseña -->
                  <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <div class="relative">
                      <div class="absolute left-3 top-1/2 -translate-y-1/2">
                        <Lock class="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        v-model="newPassword"
                        :type="showNewPassword ? 'text' : 'password'"
                        autocomplete="new-password"
                        placeholder="Ingresa tu nueva contraseña"
                        class="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                      />
                      <button
                        type="button"
                        @click="showNewPassword = !showNewPassword"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        :title="showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                      >
                        <EyeOff v-if="showNewPassword" class="w-5 h-5" />
                        <Eye v-else class="w-5 h-5" />
                      </button>
                    </div>
                    <p class="mt-1.5 text-sm text-gray-500">
                      La contraseña debe tener entre 8 y 16 caracteres
                    </p>
                  </div>

                  <!-- Mensaje de error -->
                  <div
                    v-if="passwordError"
                    class="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle class="w-5 h-5 flex-shrink-0" />
                    <span>{{ passwordError }}</span>
                  </div>

                  <div class="pt-2">
                    <button
                      type="submit"
                      :disabled="isSaving"
                      class="px-8 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      style="background-color: #085f63;"
                    >
                      {{ isSaving ? 'Guardando…' : 'Guardar Cambios' }}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>

    <!-- Alerta de Éxito -->
    <SuccessAlert v-if="alertMessage" :message="alertMessage" @close="alertMessage = ''" />

    <!-- Modal de Cerrar Sesión -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
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

    <!-- Modal de Confirmación de Cambio de Contraseña -->
    <div
      v-if="showConfirmPasswordModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Confirmar Cambio</h2>
        <p class="text-gray-600 mb-6">¿Estás seguro de que deseas actualizar tu contraseña?</p>

        <div class="flex items-center justify-end gap-3">
          <button
            @click="showConfirmPasswordModal = false"
            class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="executePasswordChange"
            class="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all"
            style="background-color: #085f63;"
          >
            Sí, cambiar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

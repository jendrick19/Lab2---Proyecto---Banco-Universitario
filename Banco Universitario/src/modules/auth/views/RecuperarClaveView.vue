<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Lock,
  Hash,
  ArrowLeft,
  Eye,
  EyeOff,
} from 'lucide-vue-next'
import logoImg from '@/assets/logo-no-background.png'
import { forgotPassword, resetPassword } from '@/modules/auth/services/authService'

type Step = 1 | 2 | 3

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const router = useRouter()

const step = ref<Step>(1)
const isLoading = ref(false)

// Campos
const correo = ref('')
const code = ref('')
const newPassword = ref('')
const showPassword = ref(false)

// Errores y Mensajes
const errors = reactive<Record<string, string>>({})
const errorMessage = ref('')
const successMessage = ref('')

const clearError = (field: string) => {
  if (errors[field]) {
    delete errors[field]
  }
}

// ── Paso 1: POST /v1/public/client/user/forgot-password ──────────────────
const handleStep1 = async () => {
  const nextErrors: Record<string, string> = {}
  if (!correo.value.trim()) nextErrors.correo = 'El correo es obligatorio'
  else if (!EMAIL_REGEX.test(correo.value)) nextErrors.correo = 'Ingresa un correo válido'

  if (Object.keys(nextErrors).length) {
    Object.assign(errors, nextErrors)
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true
  
  try {
    await forgotPassword(correo.value)

    step.value = 2
    successMessage.value = `Código enviado. Revisa tu bandeja de entrada en ${correo.value}`
  } catch (error: any) {
    errorMessage.value = error.message || 'No pudimos enviar el código. Intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// ── Paso 2: POST /v1/public/client/user/reset-password ───────────────────
const handleStep2 = async () => {
  const nextErrors: Record<string, string> = {}
  if (!code.value.trim()) nextErrors.code = 'El código es obligatorio'
  else if (code.value.trim().length !== 6) nextErrors.code = 'El código debe tener 6 dígitos'

  if (!newPassword.value) nextErrors.newPassword = 'La nueva contraseña es obligatoria'
  else if (newPassword.value.length < 6) nextErrors.newPassword = 'Mínimo 6 caracteres'

  if (Object.keys(nextErrors).length) {
    Object.assign(errors, nextErrors)
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    await resetPassword({
      email: correo.value,
      code: code.value,
      new_password: newPassword.value
    })

    step.value = 3
  } catch (error: any) {
    errorMessage.value = error.message || 'Código incorrecto o expirado. Verifica e intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

const goBackToStep1 = () => {
  step.value = 1
  code.value = ''
  newPassword.value = ''
  Object.keys(errors).forEach(key => delete errors[key])
  errorMessage.value = ''
  successMessage.value = ''
}

const goBackToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <!-- Loading overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-xs mx-4">
        <div class="relative w-14 h-14">
          <div class="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div
            class="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style="border-top-color: #49beb7; border-right-color: #49beb7"
          />
        </div>
        <p class="text-gray-700 font-medium text-center">
          {{ step === 1 ? 'Enviando código...' : 'Restableciendo contraseña...' }}
        </p>
      </div>
    </div>

    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <RouterLink to="/">
          <img :src="logoImg" alt="Banco Universitario" class="h-12 w-auto" />
        </RouterLink>
      </div>

      <!-- Tarjeta -->
      <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
        
        <!-- Mensajes Globales -->
        <div v-if="errorMessage" class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage && step !== 3" class="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="alert">
          {{ successMessage }}
        </div>

        <!-- ── PASO 1: Solicitar código ─────────────────────────────────── -->
        <template v-if="step === 1">
          <div class="flex justify-center mb-6">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center"
              style="background-color: #49beb7"
            >
              <KeyRound class="w-8 h-8 text-white" />
            </div>
          </div>

          <div class="text-center mb-6">
            <h1 class="text-2xl sm:text-3xl mb-3" style="color: #085f63">
              ¿Olvidaste tu contraseña?
            </h1>
            <p class="text-sm text-gray-600 leading-relaxed">
              Ingresa tu correo y te enviaremos un código de 6 dígitos para
              restablecer tu contraseña.
            </p>
          </div>

          <form @submit.prevent="handleStep1" class="space-y-5" novalidate>
            <div>
              <label
                for="correo"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="correo"
                  type="email"
                  v-model="correo"
                  @input="clearError('correo')"
                  placeholder="tucorreo@ejemplo.com"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                    errors.correo
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#49beb7] focus:ring-2 focus:ring-[#49beb7]/20'
                  ]"
                />
              </div>
              <p v-if="errors.correo" class="mt-1.5 text-sm text-red-600">{{ errors.correo }}</p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style="background-color: #085f63"
            >
              Enviar código de recuperación
              <ArrowRight class="w-5 h-5" />
            </button>
          </form>
        </template>

        <!-- ── PASO 2: Código + nueva clave ─────────────────────────────── -->
        <template v-if="step === 2">
          <div class="flex justify-center mb-6">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center"
              style="background-color: #49beb7"
            >
              <Hash class="w-8 h-8 text-white" />
            </div>
          </div>

          <div class="text-center mb-6">
            <h1 class="text-2xl sm:text-3xl mb-3" style="color: #085f63">
              Revisa tu correo
            </h1>
            <p class="text-sm text-gray-600 leading-relaxed">
              Hemos enviado un código de 6 dígitos a
              <span class="font-semibold" style="color: #085f63">
                {{ correo }}
              </span>
              . Ingrésalo junto con tu nueva contraseña.
            </p>
          </div>

          <form @submit.prevent="handleStep2" class="space-y-5" novalidate>
            <!-- Código -->
            <div>
              <label
                for="code"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Código de verificación <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Hash class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  inputmode="numeric"
                  maxlength="6"
                  v-model="code"
                  @input="() => { code = code.replace(/\D/g, ''); clearError('code'); }"
                  placeholder="123456"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none tracking-widest font-mono text-lg',
                    errors.code
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#49beb7] focus:ring-2 focus:ring-[#49beb7]/20'
                  ]"
                />
              </div>
              <p v-if="errors.code" class="mt-1.5 text-sm text-red-600">{{ errors.code }}</p>
            </div>

            <!-- Nueva contraseña -->
            <div>
              <label
                for="newPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Nueva contraseña <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="newPassword"
                  @input="clearError('newPassword')"
                  placeholder="Mínimo 6 caracteres"
                  :class="[
                    'w-full pl-11 pr-11 py-3 rounded-lg border transition-colors outline-none',
                    errors.newPassword
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 focus:border-[#49beb7] focus:ring-2 focus:ring-[#49beb7]/20'
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.newPassword" class="mt-1.5 text-sm text-red-600">{{ errors.newPassword }}</p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style="background-color: #085f63"
            >
              Restablecer contraseña
              <ArrowRight class="w-5 h-5" />
            </button>

            <!-- Volver atrás -->
            <button
              type="button"
              @click="goBackToStep1"
              class="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft class="w-4 h-4" />
              Volver atrás — cambiar correo
            </button>
          </form>
        </template>

        <!-- ── PASO 3: Éxito ────────────────────────────────────────────── -->
        <template v-if="step === 3">
          <div class="flex flex-col items-center text-center py-4">
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style="background-color: #49beb7"
            >
              <CheckCircle2 class="w-11 h-11 text-white" />
            </div>

            <h1 class="text-2xl sm:text-3xl font-semibold mb-3" style="color: #085f63">
              ¡Contraseña restablecida!
            </h1>
            <p class="text-sm text-gray-600 leading-relaxed mb-8 max-w-xs">
              Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar
              sesión con tus nuevas credenciales.
            </p>

            <button
              @click="goBackToLogin"
              class="w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-90"
              style="background-color: #085f63"
            >
              Ir a iniciar sesión
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </template>

        <!-- Links inferiores (ocultos en paso 3) -->
        <template v-if="step !== 3">
          <div class="mt-6 text-center">
            <RouterLink
              to="/login"
              class="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style="color: #085f63"
            >
              <ArrowLeft class="w-4 h-4" />
              Volver al inicio de sesión
            </RouterLink>
          </div>

          <div class="mt-4 text-center">
            <RouterLink
              to="/"
              class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Ir a la página principal
            </RouterLink>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-xs text-center text-gray-600">
              <strong>¿Necesitas ayuda?</strong> Contacta a soporte en
              <a
                href="mailto:soporte@bancouniversitario.com.ve"
                class="font-medium underline"
                style="color: #085f63"
              >
                soporte@bancouniversitario.com.ve
              </a>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

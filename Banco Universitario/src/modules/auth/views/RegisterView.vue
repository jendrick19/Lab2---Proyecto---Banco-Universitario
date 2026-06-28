<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-vue-next'
import logoImg from '@/assets/logo-no-background.png'
import { register } from '@/modules/auth/services/authService'

const router = useRouter()
const apiError = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const showSuccessModal = ref(false)
const accountNumber = ref('')

const formData = reactive({
  firstName: '',
  lastName: '',
  documentNumber: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive<Record<string, string>>({})

const handleChange = (field: keyof typeof formData) => {
  if (errors[field]) {
    delete errors[field]
  }
}

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'El nombre es obligatorio'
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'El apellido es obligatorio'
  }

  if (!formData.documentNumber.trim()) {
    newErrors.documentNumber = 'El documento es obligatorio'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    newErrors.email = 'El correo electrónico es obligatorio'
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Ingresa un correo electrónico válido'
  }

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = 'El teléfono es obligatorio'
  }

  if (!formData.birthDate) {
    newErrors.birthDate = 'La fecha de nacimiento es obligatoria'
  }

  if (!formData.password) {
    newErrors.password = 'La contraseña es obligatoria'
  } else if (formData.password.length < 8) {
    newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Confirma tu contraseña'
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Las contraseñas no coinciden'
  }

  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)

  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  apiError.value = ''
  isLoading.value = true

  try {
    const mappedData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      document_number: formData.documentNumber,
      birth_date: formData.birthDate ? `${formData.birthDate}T00:00:00Z` : '',
      phone_number: formData.phoneNumber,
      email: formData.email,
      password: formData.password
    }

    const data = await register(mappedData)
    accountNumber.value = data.account_number
    showSuccessModal.value = true
  } catch (error: any) {
    apiError.value = error.message || 'Error al registrar la cuenta'
  } finally {
    isLoading.value = false
  }
}

const handleCloseSuccessModal = () => {
  showSuccessModal.value = false
  router.push('/iniciar-sesion')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-secondary/5 flex items-center justify-center p-4">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4">
        <!-- Spinner Circular -->
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div
            class="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style="border-top-color: #49beb7; border-right-color: #49beb7"
          ></div>
        </div>

        <!-- Texto -->
        <p class="text-gray-700 text-lg font-medium">
          Generando tu número de cuenta...
        </p>
      </div>
    </div>

    <!-- Modal de Éxito -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
          <button
            @click="handleCloseSuccessModal"
            class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 class="w-10 h-10" />
            </div>
            <h2 class="text-2xl font-semibold">¡Cuenta Creada!</h2>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-6 space-y-4">
          <p class="text-center text-gray-700">
            Tu cuenta ha sido creada exitosamente. Este es tu número de cuenta:
          </p>

          <div class="bg-gray-50 border-2 border-dashed border-secondary/40 rounded-lg p-4">
            <p class="text-xs text-gray-500 text-center mb-1">Número de Cuenta</p>
            <p class="text-xl font-mono text-center tracking-wider" style="color: #085f63">
              {{ accountNumber }}
            </p>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p class="text-sm text-blue-800 text-center">
              💡 Guarda este número en un lugar seguro. Lo necesitarás para tus transacciones.
            </p>
          </div>

          <button
            @click="handleCloseSuccessModal"
            class="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
            style="background-color: #085f63"
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-2xl">
      <!-- Logo y Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img
            :src="logoImg"
            alt="Banco Universitario"
            class="h-12 w-auto"
          />
        </div>
        <h1 class="text-3xl font-semibold mb-2" style="color: #085f63">
          Crear Cuenta
        </h1>
        <p class="text-gray-600">
          Completa el formulario para abrir tu cuenta bancaria
        </p>
      </div>

      <!-- Formulario -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Mensaje de error de la API -->
          <div
            v-if="apiError"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {{ apiError }}
          </div>

          <!-- Nombre y Apellido -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <User class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  v-model="formData.firstName"
                  @input="handleChange('firstName')"
                  placeholder="Ej: Juan"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                    errors.firstName
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                  ]"
                />
              </div>
              <p v-if="errors.firstName" class="mt-1.5 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                Apellido <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <User class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  v-model="formData.lastName"
                  @input="handleChange('lastName')"
                  placeholder="Ej: Pérez"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                    errors.lastName
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                  ]"
                />
              </div>
              <p v-if="errors.lastName" class="mt-1.5 text-sm text-red-600">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Documento -->
          <div>
            <label for="documentNumber" class="block text-sm font-medium text-gray-700 mb-2">
              Número de Documento <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <CreditCard class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="documentNumber"
                type="text"
                v-model="formData.documentNumber"
                @input="handleChange('documentNumber')"
                placeholder="Ej: V-12345678"
                :class="[
                  'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                  errors.documentNumber
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                ]"
              />
            </div>
            <p v-if="errors.documentNumber" class="mt-1.5 text-sm text-red-600">{{ errors.documentNumber }}</p>
          </div>

          <!-- Grid de 2 columnas para Correo y Teléfono -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Correo Electrónico -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  v-model="formData.email"
                  @input="handleChange('email')"
                  placeholder="correo@ejemplo.com"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                    errors.email
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                  ]"
                />
              </div>
              <p v-if="errors.email" class="mt-1.5 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Teléfono -->
            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Phone class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  v-model="formData.phoneNumber"
                  @input="handleChange('phoneNumber')"
                  placeholder="+58 424-1234567"
                  :class="[
                    'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                    errors.phoneNumber
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                  ]"
                />
              </div>
              <p v-if="errors.phoneNumber" class="mt-1.5 text-sm text-red-600">{{ errors.phoneNumber }}</p>
            </div>
          </div>

          <!-- Fecha de Nacimiento -->
          <div>
            <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="birthDate"
                type="date"
                v-model="formData.birthDate"
                @input="handleChange('birthDate')"
                :class="[
                  'w-full pl-11 pr-4 py-3 rounded-lg border transition-colors outline-none',
                  errors.birthDate
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                ]"
              />
            </div>
            <p v-if="errors.birthDate" class="mt-1.5 text-sm text-red-600">{{ errors.birthDate }}</p>
          </div>

          <!-- Grid de 2 columnas para Contraseñas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.password"
                  @input="handleChange('password')"
                  placeholder="Mínimo 8 caracteres"
                  :class="[
                    'w-full pl-11 pr-11 py-3 rounded-lg border transition-colors outline-none',
                    errors.password
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
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
              <p v-if="errors.password" class="mt-1.5 text-sm text-red-600">{{ errors.password }}</p>
            </div>

            <!-- Confirmar Contraseña -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="formData.confirmPassword"
                  @input="handleChange('confirmPassword')"
                  placeholder="Confirma tu contraseña"
                  :class="[
                    'w-full pl-11 pr-11 py-3 rounded-lg border transition-colors outline-none',
                    errors.confirmPassword
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                  ]"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1.5 text-sm text-red-600">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <!-- Información -->
          <div class="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <div class="flex gap-3">
              <CheckCircle2 class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <p class="text-sm text-gray-700">
                Al crear tu cuenta, recibirás un número de cuenta único de 20 dígitos que podrás usar para todas tus transacciones.
              </p>
            </div>
          </div>

          <!-- Botón Submit -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
              style="background-color: #085f63"
            >
              Crear Cuenta
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </form>

        <!-- Link a Iniciar Sesión -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <RouterLink
              to="/iniciar-sesion"
              class="font-semibold transition-colors"
              style="color: #085f63"
            >
              Iniciar Sesión
            </RouterLink>
          </p>
        </div>

        <!-- Volver al Inicio -->
        <div class="mt-4 text-center">
          <RouterLink
            to="/"
            class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Volver al inicio
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

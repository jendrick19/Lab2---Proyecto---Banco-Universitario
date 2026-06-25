<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next'
import logoImg from '@/assets/logo-no-background.png'
import { login } from '@/modules/auth/services/authService'

const router = useRouter()
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const formData = reactive({
  correo: '',
  password: '',
})

const handleSubmit = async () => {
  if (!formData.correo || !formData.password) {
    return
  }

  errorMessage.value = ''
   //Activar estado de loading
  isLoading.value = true

 try {
    // Autenticación real contra el bank-service. El token se guarda en localStorage.
    await login({ email: formData.correo, password: formData.password })
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gradient-to-br from-white to-gray-50">
    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="mx-4 flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-2xl">
        <!-- Spinner Circular -->
        <div class="relative h-16 w-16">
          <div class="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div
            class="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
            :style="{ borderTopColor: '#49beb7', borderRightColor: '#49beb7' }"
          ></div>
        </div>

        <!-- Texto -->
        <p class="text-lg font-medium text-gray-700">Verificando credenciales...</p>
      </div>
    </div>

    <!-- Sección Visual - Lado Izquierdo -->
    <div
      class="relative hidden overflow-hidden bg-gradient-to-br from-primary to-secondary lg:flex lg:w-1/2"
    >
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
          alt="Tecnología financiera y educación"
          class="h-full w-full object-cover opacity-30"
        />
      </div>
      <div class="relative z-10 flex flex-col justify-center p-12 text-white">
        <h1 class="mb-6 text-4xl leading-tight sm:text-5xl">
          Tu banco universitario de confianza
        </h1>
        <p class="mb-8 text-xl leading-relaxed text-white/90">
          Gestiona tus finanzas de forma segura y sencilla desde cualquier lugar
        </p>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>Transferencias instantáneas sin comisión</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>Seguridad bancaria de última generación</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span>Soporte 24/7 para estudiantes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección del Formulario - Lado Derecho -->
    <div class="flex w-full items-center justify-center p-8 lg:w-1/2">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="mb-8 flex justify-center">
          <img :src="logoImg" alt="Banco Universitario" class="h-14 w-auto" />
        </div>

        <!-- Título y Subtítulo -->
        <div class="mb-8 text-center">
          <h1 class="mb-3 text-3xl sm:text-4xl" style="color: #085f63">
            Bienvenido de nuevo
          </h1>
          <p class="text-gray-600">
            Ingresa tus credenciales para acceder a tu banca en línea
          </p>
        </div>

        <!-- Formulario -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Mensaje de error -->
          <div
            v-if="errorMessage"
            class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {{ errorMessage }}
          </div>

          <!-- Correo Electrónico -->
          <div>
            <label for="correo" class="mb-2 block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="correo"
                v-model="formData.correo"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                required
              />
            </div>
          </div>

          <!-- Contraseña -->
          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
                class="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-11 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-5 w-5" />
                <Eye v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Enlace de Recuperación -->
          <div class="flex justify-end">
            <RouterLink
              to="/recuperar-clave"
              class="text-sm font-medium transition-colors"
              style="color: #085f63"
            >
              ¿Olvidaste tu contraseña?
            </RouterLink>
          </div>

          <!-- Botón Iniciar Sesión -->
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full items-center justify-center gap-2 rounded-lg py-4 font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            style="background-color: #085f63"
          >
            Iniciar Sesión
            <ArrowRight class="h-5 w-5" />
          </button>
        </form>

        <!-- Opción de Registro -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            ¿Aún no eres cliente?
            <RouterLink
              to="/registro"
              class="font-semibold transition-colors"
              style="color: #085f63"
            >
              Regístrate aquí
            </RouterLink>
          </p>
        </div>

        <!-- Volver al Inicio -->
        <div class="mt-6 text-center">
          <RouterLink
            to="/"
            class="text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            ← Volver al inicio
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getUser, clearSession } from '@/shared/utils/authStorage'

const router = useRouter()
const user = getUser()

const handleLogout = () => {
  clearSession()
  router.push('/login')
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-semibold text-primary">
          Bienvenido{{ user?.first_name ? `, ${user.first_name}` : '' }}
        </h1>
        <button
          type="button"
          class="rounded-lg border-2 border-primary px-5 py-2 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          @click="handleLogout"
        >
          Cerrar sesión
        </button>
      </div>
      <p class="mt-3 text-gray-600">
        Esta es una ruta protegida. Solo es visible con una sesión iniciada.
      </p>
    </div>
  </section>
</template>

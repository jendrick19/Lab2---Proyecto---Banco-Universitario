<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Users } from 'lucide-vue-next'
import { getUser, clearSession } from '@/shared/utils/authStorage'
import DashboardSidebar from '@/modules/dashboard/components/DashboardSidebar.vue'
import DashboardHeader from '@/modules/dashboard/components/DashboardHeader.vue'

const router = useRouter()
const user = getUser()
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
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-72">
      <DashboardHeader :user="user" />

      <main class="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div class="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center mb-6">
          <Users class="w-10 h-10 text-secondary" />
        </div>
        <h1 class="text-3xl font-semibold text-primary mb-3">Contactos</h1>
        <p class="text-gray-600 max-w-md">
          Esta sección estará disponible pronto. Aquí podrás guardar y gestionar
          tus beneficiarios frecuentes para agilizar tus transferencias.
        </p>
      </main>
    </div>

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
  </div>
</template>

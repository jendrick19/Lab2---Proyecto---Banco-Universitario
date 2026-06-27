<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import DashboardHeader from '../components/DashboardHeader.vue'
import { getUser, clearSession } from '@/shared/utils/authStorage'
import { getMovements } from '../services/dashboardService'

const router = useRouter()
const user = getUser()

const movements = ref([])
const isLoading = ref(true)
const hasError = ref(false)
const activeFilter = ref('all')
const showLogoutModal = ref(false)

const fetchMovements = async () => {
  try {
    isLoading.value = true
    hasError.value = false

    const apiData = await getMovements({ page: 1, pageSize: 100 })
    movements.value = Array.isArray(apiData) ? apiData : []
  } catch (error) {
    console.error('Error cargando movimientos:', error)
    hasError.value = true
    movements.value = []
  } finally {
    isLoading.value = false
  }
}

const filteredMovements = computed(() => {
  const sorted = [...movements.value].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })

  if (activeFilter.value === 'income') {
    return sorted.filter((movement) => movement.multiplier !== -1)
  }

  if (activeFilter.value === 'expense') {
    return sorted.filter((movement) => movement.multiplier === -1)
  }

  return sorted
})

const formatDate = (date) => {
  if (!date) return 'Sin fecha'

  return new Date(date).toLocaleDateString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatMoney = (amount) => {
  return Number(amount ?? 0).toFixed(2)
}

const getAmountText = (movement) => {
  if (movement.multiplier === -1) {
    return `Bs. -${formatMoney(movement.amount)}`
  }

  return `+ Bs. ${formatMoney(movement.amount)}`
}

const getAmountClass = (movement) => {
  return movement.multiplier === -1 ? 'text-red-500' : 'text-[#49beb7]'
}

const getFilterClass = (filter) => {
  return [
    'px-8 py-3 rounded-xl text-[16px] font-semibold transition-all duration-200 border',
    activeFilter.value === filter
      ? 'bg-[#49beb7] text-white border-[#49beb7] shadow-sm'
      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
  ]
}

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  clearSession()
  router.push('/login')
}

const cancelLogout = () => {
  showLogoutModal.value = false
}

onMounted(() => {
  fetchMovements()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-72">
      <DashboardHeader :user="user" />

      <main class="flex-1 p-8 max-w-6xl w-full mx-auto">
        <h1 class="text-3xl font-bold text-[#085f63] mb-7">
          Historial de Movimientos
        </h1>

        <div class="flex items-center gap-3 mb-6">
          <button
            :class="getFilterClass('all')"
            @click="activeFilter = 'all'"
          >
            Todos
          </button>

          <button
            :class="getFilterClass('income')"
            @click="activeFilter = 'income'"
          >
            Ingresos
          </button>

          <button
            :class="getFilterClass('expense')"
            @click="activeFilter = 'expense'"
          >
            Egresos
          </button>
        </div>

        <section class="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div
            v-if="isLoading"
            class="p-12 flex flex-col items-center justify-center text-slate-500"
          >
            <div class="w-10 h-10 border-4 border-[#49beb7] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="font-medium">Cargando movimientos...</p>
          </div>

          <div
            v-else-if="hasError"
            class="p-12 flex flex-col items-center justify-center text-center text-slate-500"
          >
            <p class="font-medium mb-4">No se pudieron cargar los movimientos.</p>
            <button
              @click="fetchMovements"
              class="px-6 py-2.5 rounded-xl bg-[#49beb7] text-white font-semibold hover:bg-[#3aa9a2] transition-colors"
            >
              Reintentar
            </button>
          </div>

          <div
            v-else-if="filteredMovements.length === 0"
            class="p-12 text-center text-slate-500"
          >
            No hay movimientos para mostrar.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-slate-200">
                  <th class="px-6 py-5 text-[16px] font-semibold text-slate-700">
                    ID/Ref
                  </th>

                  <th class="px-6 py-5 text-[16px] font-semibold text-slate-700">
                    Fecha
                  </th>

                  <th class="px-6 py-5 text-[16px] font-semibold text-slate-700">
                    Descripción
                  </th>

                  <th class="px-6 py-5 text-[16px] font-semibold text-slate-700 text-right">
                    Monto
                  </th>

                  <th class="px-6 py-5 text-[16px] font-semibold text-slate-700 text-right">
                    Saldo
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="movement in filteredMovements"
                  :key="movement.id"
                  class="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                >
                  <td class="px-6 py-5 text-[16px] text-slate-600">
                    #{{ movement.id }}
                  </td>

                  <td class="px-6 py-5 text-[16px] text-slate-600 whitespace-nowrap">
                    {{ formatDate(movement.created_at) }}
                  </td>

                  <td class="px-6 py-5 text-[16px] text-slate-900">
                    {{ movement.description }}
                  </td>

                  <td
                    :class="[
                      'px-6 py-5 text-[16px] font-medium text-right whitespace-nowrap',
                      getAmountClass(movement)
                    ]"
                  >
                    {{ getAmountText(movement) }}
                  </td>

                  <td class="px-6 py-5 text-[16px] font-semibold text-slate-950 text-right whitespace-nowrap">
                    Bs. {{ formatMoney(movement.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>

    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
        <h2 class="text-xl font-bold text-gray-800 mb-2">
          ¿Cerrar Sesión?
        </h2>

        <p class="text-gray-600 mb-6">
          ¿Estás seguro de que deseas salir de tu cuenta?
        </p>

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
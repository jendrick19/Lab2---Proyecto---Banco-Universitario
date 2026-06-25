<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { getUser, clearSession } from "@/shared/utils/authStorage";
import { getDashboardData } from "../services/dashboardService";
import DashboardSidebar from "../components/DashboardSidebar.vue";
import BalanceCard from "../components/BalanceCard.vue";
import DashboardHeader from "../components/DashboardHeader.vue";
import TransactionList from '../components/TransactionList.vue';

const router = useRouter();
const user = getUser();

const balance = ref(0);
const apiTransactions = ref([]);
const isLoading = ref(true);

const showLogoutModal = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const data = await getDashboardData();
  
  balance.value = data.balance;
  
  // Mapear transacciones
  apiTransactions.value = data.transactions.map(t => {
    // Formatear la fecha
    const dateObj = new Date(t.created_at);
    // ej. "14 Abr 2026"
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateStr = dateObj.toLocaleDateString('es-VE', options);

    return {
      id: t.id,
      date: dateStr,
      description: t.description,
      amount: t.amount,
      type: t.multiplier === -1 ? 'sent' : 'received'
    };
  });
  
  isLoading.value = false;
});

const handleLogout = () => {
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  clearSession();
  router.push("/login"); // using correct /auth/login based on earlier steps
};

const cancelLogout = () => {
  showLogoutModal.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />
    <div class="flex-1 flex flex-col ml-72">

      <DashboardHeader :user="user" />
      <main class="flex-1 p-8 max-w-6xl w-full mx-auto flex flex-col gap-6 relative">
        
        <div v-if="isLoading" class="absolute inset-0 bg-gray-50/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center pt-20">
          <div class="w-10 h-10 border-4 border-[#49beb7] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600 font-medium text-lg">Cargando datos...</p>
        </div>

        <BalanceCard :balance="balance" />
        
        <TransactionList :transactions="apiTransactions" />  
      </main>
    </div>

    <!-- Modal de Cerrar Sesión -->
    <div v-if="showLogoutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
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

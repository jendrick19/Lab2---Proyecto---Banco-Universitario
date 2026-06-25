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
  clearSession();
  router.push("/login"); // using correct /auth/login based on earlier steps
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
  </div>
</template>

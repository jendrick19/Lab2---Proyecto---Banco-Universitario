<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { getUser, clearSession } from "@/shared/utils/authStorage";
import DashboardSidebar from "../components/DashboardSidebar.vue";
import BalanceCard from "../components/BalanceCard.vue";
import DashboardHeader from "../components/DashboardHeader.vue";
import TransactionList from '../components/TransactionList.vue';

// 1. Datos de prueba (esto es lo que vendrá de la API después)
const transactions = ref([
  { id: 1, date: '14 Abr 2026', description: 'Transferencia enviada a Jendrick', amount: '250.00', type: 'sent' },
  { id: 2, date: '12 Abr 2026', description: 'Depósito recibido', amount: '500.00', type: 'received' },
  { id: 3, date: '10 Abr 2026', description: 'Pago de matrícula', amount: '1200.00', type: 'sent' },
]);

const router = useRouter();
const user = getUser();

const handleLogout = () => {
  clearSession();
  router.push("/login");
};
</script>

<template>
 <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />
    <div class="flex-1 flex flex-col ml-72">

      <DashboardHeader :user="user" />
      <main class="flex-1 p-8 max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        <BalanceCard />
        
      <TransactionList :transactions="transactions" />  
      </main>
    </div>
  </div>
</template>

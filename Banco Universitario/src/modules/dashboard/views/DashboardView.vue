<script setup>
import { useRouter } from "vue-router";
import { getUser, clearSession } from "@/shared/utils/authStorage";
import DashboardSidebar from "../components/DashboardSidebar.vue";
import BalanceCard from "../components/BalanceCard.vue";
import DashboardHeader from "../components/DashboardHeader.vue";

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
        
        
        <p class="text-xs text-gray-400">
          Contenido del Dashboard en desarrollo...
        </p>
      </main>
    </div>
  </div>
</template>

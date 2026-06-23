<script setup>
import { useRouter } from "vue-router";
import { getUser, clearSession } from "@/shared/utils/authStorage";
import DashboardSidebar from "../components/DashboardSidebar.vue";

const router = useRouter();
const user = getUser();

const handleLogout = () => {
  clearSession();
  router.push("/login");
};
</script>

<template>
  <div class="flex-1 flex flex-col ml-72">
    <DashboardSidebar :on-logout="handleLogout" />
    <div class="flex-1 flex flex-col">
      <DashboardHeader :user="user" />
      <main class="flex-1 p-8 max-w-6xl w-full mx-auto">
        <p class="text-xs text-gray-400">
          Contenido del Dashboard en desarrollo...
        </p>
      </main>
    </div>
  </div>
</template>

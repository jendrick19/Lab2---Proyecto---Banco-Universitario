<template>
  <header class="w-full bg-white py-4 px-8 flex justify-end items-center border-b border-gray-100">
    <div class="flex items-center gap-3">
      <span class="text-slate-600 text-[15px]">
         Hola, <span class="font-bold text-teal-800">{{ user?.name || 'Sebastian Castillo' }}</span>
      </span>
      
      <div class="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>

 defineProps({
  user: {
    type: Object,
    default: () => ({ name: 'Usuario' }) 
  }
});
</script>
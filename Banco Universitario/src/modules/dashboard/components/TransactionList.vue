<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white border border-gray-100 rounded-2xl shadow-sm">
    <h2 class="text-teal-800 font-bold text-lg p-6 pb-2">Últimos Movimientos</h2>

    <div class="flex flex-col">
      <div v-for="tx in transactions" :key="tx.id"
           class="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-b-0">
        
        <div class="flex items-center gap-6">
          
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
            tx.type === 'sent' ? 'bg-orange-50 text-red-500' : 'bg-teal-50 text-teal-500'
          ]">
            <svg v-if="tx.type === 'sent'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <polyline points="17 7 17 17 7 17"></polyline>
            </svg>
          </div>

          <div class="flex items-center gap-4">
            <span class="text-gray-400 text-sm w-24">{{ tx.date }}</span>
            <span class="text-gray-800 text-sm font-medium">{{ tx.description }}</span>
          </div>
        </div>

        <span :class="['font-bold text-sm', tx.type === 'sent' ? 'text-red-500' : 'text-teal-500']">
          {{ tx.type === 'sent' ? 'Bs. ' : '+ Bs. ' }}{{ tx.amount }}
        </span>
      </div>
    </div>
  </div>
</template>
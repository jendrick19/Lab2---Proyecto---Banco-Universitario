<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(20);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.transactions.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(props.transactions.length / itemsPerPage.value) || 1;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const formatAmount = (amount) => {
  return Number(amount).toLocaleString('es-VE', { minimumFractionDigits: 2 });
};
</script>

<template>
  <div class="bg-white border border-gray-100 rounded-2xl shadow-sm">
    <h2 class="text-teal-800 font-bold text-lg p-6 pb-2">Últimos Movimientos</h2>

    <div class="flex flex-col">
      <div v-for="tx in paginatedTransactions" :key="tx.id"
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
          {{ tx.type === 'sent' ? 'Bs. ' : '+ Bs. ' }}{{ formatAmount(tx.amount) }}
        </span>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        Anterior
      </button>
      
      <span class="text-sm font-medium text-gray-500">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
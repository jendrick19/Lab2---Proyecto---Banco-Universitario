<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="bg-white border border-gray-100 rounded-xl p-6">
    <h2 class="text-teal-800 font-bold mb-6">Últimos Movimientos</h2>
    
    <div class="space-y-4">
      <div v-for="tx in transactions" :key="tx.id" class="flex items-center justify-between py-2">
        <div class="flex items-center gap-4">
          <!-- Icono Dinámico -->
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            tx.type === 'sent' ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-500'
          ]">
            <!-- Aquí iría tu icono (flecha arriba/abajo) -->
            <component :is="tx.type === 'sent' ? 'ArrowUpIcon' : 'ArrowDownIcon'" />
          </div>
          <span class="text-gray-500 text-sm">{{ tx.date }}</span>
          <span class="text-gray-800">{{ tx.description }}</span>
        </div>
        
        <!-- Monto Dinámico -->
        <span :class="['font-bold', tx.type === 'sent' ? 'text-red-500' : 'text-teal-500']">
          {{ tx.type === 'sent' ? '' : '+' }} Bs. {{ tx.amount }}
        </span>
      </div>
    </div>
  </div>
</template>
<template>
  <div class="w-full bg-[#4DBDB6] rounded-[24px] p-8 text-white shadow-sm flex flex-col gap-5 select-none">
    
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3"/>
          <circle cx="16" cy="14" r="1"/>
        </svg>
      </div>
      <span class="text-lg font-medium tracking-wide opacity-95">
        {{ title }}
      </span>
    </div>

    <div class="mt-1">
      <h1 class="text-5xl font-bold tracking-tight">
        Bs. {{ formattedBalance }}
      </h1>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BalanceCard',
  props: {
    // Título de la tarjeta (por si la API maneja cuenta corriente, ahorros, etc.)
    title: {
      type: String,
      default: 'Saldo Disponible'
    },
    // El valor numérico puro que vendrá de la API de Postman
    balance: {
      type: Number,
      default: 15500.00 
    }
  },
  computed: {
    // Esta función formatea el número automáticamente
    formattedBalance() {
      return this.balance.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
</script>
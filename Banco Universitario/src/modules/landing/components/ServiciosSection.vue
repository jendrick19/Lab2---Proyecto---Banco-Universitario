<template>
  <section class="py-24 bg-white" id="servicios">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <div class="text-center mb-20">
        <h2 class="text-4xl font-extrabold text-[#004a4e] tracking-tight sm:text-5xl">
          Servicios pensados para ti
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        
        <div class="flex flex-col p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <ArrowLeftRightIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[#004a4e] mb-4">Transferencias sin comisión</h3>
          <p class="text-gray-600 leading-relaxed flex-grow text-lg">
             
          </p>
        </div>

        <div class="flex flex-col p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <BanknoteIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[#004a4e] mb-4">Depósitos en efectivo</h3>
          <p class="text-gray-600 leading-relaxed flex-grow text-lg">
             
          </p>
        </div>

        <div class="flex flex-col p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <WalletCardsIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[#004a4e] mb-4">Retiros en efectivo</h3>
          <p class="text-gray-600 leading-relaxed flex-grow text-lg">
              
          </p>
        </div>

        <div class="flex flex-col p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-start-1">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <GraduationCapIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[#004a4e] mb-4">Pago de matrícula</h3>
          <p class="text-gray-600 leading-relaxed flex-grow text-lg">
            
          </p>
        </div>

        <div class="flex flex-col p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-start-2">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-8 shadow-sm">
            <AwardIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-[#004a4e] mb-4">Cobro de becas</h3>
          <p class="text-gray-600 leading-relaxed flex-grow text-lg">
            
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Importamos los iconos de Lucide Vue (son como Heroicons pero con más variedad)
// Nota: Es posible que necesites instalarlos primero si Jendrick no lo hizo.
// Si te da error de import, avísame y te digo cómo instalarlos.
import { 
  ArrowLeftRightIcon, 
  BanknoteIcon, 
  WalletCardsIcon, 
  GraduationCapIcon, 
  AwardIcon 
} from 'lucide-vue-next';
</script>
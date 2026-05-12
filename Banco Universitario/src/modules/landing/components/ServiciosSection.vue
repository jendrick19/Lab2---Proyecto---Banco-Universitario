<template>
  <section class="py-24 bg-white" id="servicios">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <div class="mb-20 text-center">
        <h2 class="text-5xl font-normal text-[#004a4e] tracking-tight">
          Servicios pensados para ti
        </h2>
      </div>

      <div class="flex flex-wrap justify-center gap-10">
        
        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <ArrowLeftRightIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Transferencias</h3>
          <p class="text-gray-600 leading-relaxed text-sm">Realiza envíos de dinero entre cuentas de forma inmediata y sin comisiones adicionales.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <BanknoteIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Depósitos</h3>
          <p class="text-gray-600 leading-relaxed text-sm">Gestiona tus ahorros depositando efectivo en cualquiera de nuestras sedes universitarias.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <WalletCardsIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Retiros</h3>
          <p class="text-gray-600 leading-relaxed text-sm">Accede a tu dinero en efectivo de manera segura a través de nuestra red de cajeros.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <GraduationCapIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Matrícula</h3>
          <p class="text-gray-600 leading-relaxed text-sm">Simplifica tus trámites académicos pagando tu inscripción directamente desde el portal.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <AwardIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Becas</h3>
          <p class="text-gray-600 leading-relaxed text-sm">Recibe tus beneficios estudiantiles de forma automática y transparente cada mes.</p>
        </div>
        </div>

      </div>  
    </section>
</template>

<script setup>
import { 
  ArrowLeftRightIcon, 
  BanknoteIcon, 
  WalletCardsIcon, 
  GraduationCapIcon, 
  AwardIcon 
} from 'lucide-vue-next';
</script>
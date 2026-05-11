<template>
  <section class="py-24 bg-white" id="servicios">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <div class="mb-20 text-center lg:text-left">
        <h2 class="text-5xl font-normal text-[#004a4e] tracking-tight">
          Servicios pensados para ti
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <ArrowLeftRightIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e]">Transferencias</h3>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <BanknoteIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e]">Depósitos</h3>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <WalletCardsIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e]">Retiros</h3>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all lg:col-start-1 lg:ml-[50%]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <GraduationCapIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e]">Matrícula</h3>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all lg:col-start-2 lg:ml-[50%]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <AwardIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e]">Becas</h3>
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
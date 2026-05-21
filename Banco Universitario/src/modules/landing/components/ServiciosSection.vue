<template>
  <section class="py-24 bg-white" id="servicios">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <div class="mb-20 text-center">
        <h2 class="text-5xl font-normal text-[#004a4e] tracking-tight">
          Servicios pensados para ti
        </h2>
      </div>

      <div class="flex flex-wrap justify-center gap-10">
        
        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <ArrowLeftRightIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Transferencias sin comisión</h3>
          <p class="text-gray-600 leading-relaxed text-sm text-justify">El Banco Universitario ofrece un servicio de transferencias entre estudiantes sin costo alguno, con el objetivo de facilitar el intercambio de dinero de manera rápida, segura y eficiente.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <BanknoteIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Depósitos</h3>
          <p class="text-gray-600 leading-relaxed text-sm text-justify">Permite a los estudiantes realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales. Disponible las 24 horas del día, los 7 días de la semana.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <WalletCardsIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Retiros</h3>
          <p class="text-gray-600 leading-relaxed text-sm text-justify">Los estudiantes pueden realizar retiros en efectivo de manera rápida y segura en cualquiera de las sucursales del banco, con la tranquilidad de que sus fondos están protegidos.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <GraduationCapIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Matrícula</h3>
          <p class="text-gray-600 leading-relaxed text-sm text-justify">Servicio de pago de matrícula estudiantil en línea, disponible las 24 horas del día, que permite a los estudiantes universitarios pagar sus matrículas de manera rápida y sencilla.</p>
        </div>

        <div class="flex flex-col items-center text-center p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]">
          <div class="w-16 h-16 bg-[#55c0b8] rounded-full flex items-center justify-center mb-6">
            <AwardIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-semibold text-[#004a4e] mb-4">Becas</h3>
          <p class="text-gray-600 leading-relaxed text-sm text-justify">Los estudiantes pueden cobrar sus becas estudiantiles de manera sencilla y eficiente en cuaquiera de las sucursales del banco, accediendo de forma rápida y segura.</p>
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
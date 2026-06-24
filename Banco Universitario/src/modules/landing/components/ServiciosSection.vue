<script setup>
import { ArrowRightLeft, Banknote, GraduationCap, Wallet, Award } from 'lucide-vue-next';

const services = [
  {
    icon: ArrowRightLeft,
    title: 'Transferencias sin comisión',
    description: 'El Banco Universitario ofrece un servicio de transferencias entre estudiantes sin costo alguno, con el objetivo de facilitar el intercambio de dinero de manera rápida, segura y eficiente.',
  },
  {
    icon: Banknote,
    title: 'Depósitos en efectivo',
    description: 'Permite a los estudiantes realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales. Disponible las 24 horas del día, los 7 días de la semana.',
  },
  {
    icon: Wallet,
    title: 'Retiros en efectivo',
    description: 'Los estudiantes pueden realizar retiros en efectivo de manera rápida y segura en cualquiera de las sucursales del banco, con la tranquilidad de que sus fondos están protegidos.',
  },
  {
    icon: GraduationCap,
    title: 'Pago de matrícula',
    description: 'Servicio de pago de matrícula estudiantil en línea, disponible las 24 horas del día, que permite a los estudiantes universitarios pagar sus matrículas de manera rápida y sencilla.',
  },
  {
    icon: Award,
    title: 'Cobro de becas',
    description: 'Los estudiantes universitarios pueden cobrar sus becas estudiantiles de manera sencilla y eficiente en cualquiera de las sucursales del banco, accediendo a sus fondos de forma rápida y segura.',
  },
];
</script>

<template>
  <section id="servicios" class="py-8 lg:py-24 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 lg:mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl mb-4 text-primary">
          Servicios pensados para ti
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services.slice(0, 3)"
          :key="index"
          class="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all"
        >
          <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <component :is="service.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="mb-3 text-xl text-primary sm:text-2xl">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-center gap-8 mt-8">
        <div
          v-for="(service, index) in services.slice(3)"
          :key="index + 3"
          class="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-all w-full md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
        >
          <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <component :is="service.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="mb-3 text-xl text-primary sm:text-2xl">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
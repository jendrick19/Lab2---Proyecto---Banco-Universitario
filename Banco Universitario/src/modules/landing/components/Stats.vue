<script setup>
import { Users, Building2, Award, TrendingUp } from 'lucide-vue-next';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Estudiantes Activos',
    description: 'Confían en nosotros',
  },
  {
    icon: Building2,
    value: '100+',
    label: 'Universidades',
    description: 'En todo el país',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Calificación',
    description: 'En tiendas de apps',
  },
  {
    icon: TrendingUp,
    value: '$50M+',
    label: 'Ahorrados',
    description: 'Por nuestros usuarios',
  },
];
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-[#085163] to-[#49beb7] relative overflow-hidden">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 opacity-10">
      <img
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200"
        alt="Campus universitario"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <component :is="stat.icon" class="h-8 w-8 text-white" />
          </div>
          <div class="text-4xl text-white mb-2">{{ stat.value }}</div>
          <div class="text-xl text-white mb-1">{{ stat.label }}</div>
          <div class="text-white/80">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

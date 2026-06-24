<script setup>
import { Star, Quote } from 'lucide-vue-next';

const testimonials = [
  {
    name: 'María González',
    university: 'Universidad Nacional',
    major: 'Ingeniería de Sistemas',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    rating: 5,
    text: 'La mejor decisión que tomé fue abrir mi cuenta en Banco Universitario. La app es súper fácil de usar y los beneficios son increíbles.',
  },
  {
    name: 'Carlos Martínez',
    university: 'Universidad Tecnológica',
    major: 'Administración',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    rating: 5,
    text: 'Me ayudaron a entender mejor mis finanzas. El ahorro automático me permitió cumplir mis metas y el soporte es excelente.',
  },
  {
    name: 'Ana Silva',
    university: 'Universidad Central',
    major: 'Medicina',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    rating: 5,
    text: 'Los descuentos en comercios aliados y el cashback me han permitido ahorrar mucho. ¡100% recomendado para estudiantes!',
  },
];
</script>

<template>
  <section class="py-8 lg:py-20 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 lg:mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
          Lo Que Dicen Nuestros Estudiantes
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Miles de estudiantes ya confían en nosotros para gestionar sus finanzas
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
        >
          <Quote class="absolute top-6 right-6 h-12 w-12 text-secondary/20" />
          
          <div class="flex items-center gap-4 mb-6">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div class="text-primary mb-1">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-600">{{ testimonial.major }}</div>
              <div class="text-xs text-gray-500">{{ testimonial.university }}</div>
            </div>
          </div>

          <div class="flex gap-1 mb-4">
            <Star
              v-for="i in testimonial.rating"
              :key="i"
              class="h-5 w-5 fill-secondary text-secondary"
            />
          </div>

          <p class="text-gray-700 leading-relaxed">{{ testimonial.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

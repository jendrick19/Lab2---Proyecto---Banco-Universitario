<script setup>
import { ArrowRight, Smartphone, Check } from 'lucide-vue-next';
</script>

<template>
  <section class="py-20 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center bg-gradient-to-r from-[#085163] to-[#49beb7] rounded-3xl overflow-hidden shadow-2xl">
        <!-- Contenido Izquierda -->
        <div class="p-8 lg:p-12 text-white">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl mb-6">
            Comienza tu Viaje Financiero Hoy
          </h2>
          <p class="text-xl text-white/90 mb-8 leading-relaxed">
            Abre tu cuenta en menos de 5 minutos y empieza a disfrutar de todos los beneficios
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Check class="h-4 w-4 text-white" />
              </div>
              <span>Sin cargos ocultos</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Check class="h-4 w-4 text-white" />
              </div>
              <span>Apertura 100% digital</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Check class="h-4 w-4 text-white" />
              </div>
              <span>Soporte 24/7</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <router-link
              to="/registro"
              class="group inline-flex items-center justify-center px-8 py-4 bg-white text-[#085163] rounded-lg hover:bg-white/90 transition-all shadow-xl"
            >
              <Smartphone class="mr-2 h-5 w-5" />
              Abrir cuenta ahora
              <ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>

        <!-- Imagen Derecha -->
        <div class="hidden lg:block relative h-full min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800"
            alt="Estudiante usando app bancaria"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

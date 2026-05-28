<script setup>
import AppButton from '@/shared/components/ui/AppButton.vue'
</script>

<template>
  <section id="inicio" class="relative overflow-hidden bg-white py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="items-center gap-16 lg:grid lg:grid-cols-2">
        <div>
          <h1 class="mb-6 text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl">
            Tu banco, tu futuro universitario
          </h1>

          <p class="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Somos una institución financiera comprometida con los estudiantes, brindando soluciones ágiles y eficientes
          </p>

          <AppButton size="lg" variant="secondary" to="/registro">
            Abre tu cuenta hoy
          </AppButton>
        </div>

        <div class="mt-12 lg:mt-0">
          <div class="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
              alt="Estudiantes universitarios colaborando"
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

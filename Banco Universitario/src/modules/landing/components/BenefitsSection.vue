<script setup>
import AppButton from '@/shared/components/ui/AppButton.vue'

const beneficios = [
  'Sin comisiones de mantenimiento',
  'Transferencias ilimitadas sin costo',
  'Retiros gratis en cajeros del país',
  'Descuentos en comercios aliados',
  'Acceso a préstamos estudiantiles',
  'Asesoría financiera personalizada',
  'Programa de recompensas',
  'Atención 24/7 vía chat'
]
</script>

<template>
  <section id="beneficios" class="bg-white py-8 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
        
        <div class="relative">
          <div class="overflow-hidden rounded-[2rem] shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1704088030734-96769c4593a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlb3BsZSUyMGJhbmtpbmclMjBtb2JpbGUlMjBhcHB8ZW58MXx8fHwxNzc0Mzc2Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Estudiante usando la app del banco universitario" 
              class="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div class="lg:pl-8">
          
          <div class="mb-6 inline-flex items-center rounded-full bg-secondary/10 px-4 py-2">
            <span class="text-sm font-normal text-secondary">Beneficios exclusivos</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl text-primary mb-2 leading-tight lg:whitespace-nowrap font-medium">
            Más que un Banco, Tu <br /> Aliado Universitario
          </h2>
          
          <p class="mt-0 text-xl leading-relaxed text-gray-600">
            <span class="lg:block">Entendemos las necesidades de los estudiantes y hemos creado</span>
            <span class="lg:block">beneficios que realmente hacen la diferencia en tu día a día.</span>
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div v-for="(beneficio, index) in beneficios" :key="index" class="flex items-center gap-3">
              <div class="shrink-0">
                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <p class="text-base text-gray-700">
                {{ beneficio }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <AppButton variant="primary" size="lg">
              Descubre todos los beneficios
            </AppButton>
          </div>
          
        </div>

      </div>
    </div>
  </section>
</template>
<template>
  <section class="bg-white text-slate-800 py-16 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <div class="w-full flex justify-center">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
          alt="Estudiante Universitaria" 
          class="rounded-3xl object-cover w-full max-h-[480px] shadow-sm"
        />
      </div>

      <div class="space-y-6">
        <div>
          <span class="text-[#2dd4bf] text-xs font-semibold uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
            Beneficios exclusivos
          </span>
          
          <h2 class="text-3xl md:text-4xl font-bold mt-3 text-[#0e4e5e] leading-tight">
            Más que un Banco, Tu Aliado Universitario
          </h2>
          
          <p class="text-slate-600 mt-4 leading-relaxed text-left">
            Entendemos las necesidades de los estudiantes y hemos creado beneficios que realmente hacen la diferencia en tu día a día.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
          
          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Sin comisiones de mantenimiento</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Transferencias ilimitadas sin costo</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Retiros gratis en cajeros del país</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Descuentos en comercios aliados</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Acceso a préstamos estudiantiles</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Asesoría financiera personalizada</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Programa de recompensas</span>
          </div>

          <div class="flex items-center space-x-3">
            <div class="bg-[#2dd4bf]/20 text-[#0e4e5e] p-1.5 rounded-full flex-shrink-0">
              <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-sm md:text-base font-medium text-slate-700">Atención 24/7 vía chat</span>
          </div>

        </div>

        <div class="pt-4 flex justify-start">
          <button class="bg-[#0b4f6c] hover:bg-[#083b52] text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm text-sm md:text-base">
            Descubre todos los beneficios
          </button>
        </div>
      </div>

    </div>
  </section>
</template>
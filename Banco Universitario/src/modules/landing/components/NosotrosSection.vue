<script setup>
const objetivos = [
  'Brindar a los estudiantes universitarios un servicio eficiente y de calidad en la gestión de sus recursos financieros, a través de nuestros canales digitales y nuestros puntos de atención presencial.',
  'Fomentar el uso de nuestras plataformas digitales para hacer transferencias entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo herramientas tecnológicas fáciles y seguras.',
  'Promover la educación financiera de los estudiantes universitarios, a través de charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el uso responsable del crédito.',
  'Establecer alianzas estratégicas con universidades y empresas para ofrecer beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas, becas, prácticas laborales, entre otros.',
  'Mantener una cultura de innovación y mejora continua en nuestros procesos, productos y servicios, para estar siempre a la vanguardia de las necesidades de nuestros clientes y del mercado.',
]
</script>

<template>
  <section id="nosotros" class="bg-gray-50 py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <article class="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
          <div class="mb-6 flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="m12 7 4 4" />
                <path d="m12 12 0 5" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-primary sm:text-3xl">Nuestra Misión</h2>
          </div>
          <p class="text-lg leading-relaxed text-gray-700">
            Somos una confiable institución financiera comprometida con los estudiantes universitarios,
            brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la gestión
            de sus recursos y contribuir al crecimiento económico y personal de nuestros clientes.
          </p>
        </article>

        <article class="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
          <div class="mb-6 flex items-center gap-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M2.06 12a10 10 0 0 1 19.88 0" />
                <path d="M12 4a10 10 0 0 1 0 16" />
                <path d="M2.06 12a10 10 0 0 0 19.88 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-primary sm:text-3xl">Nuestra Visión</h2>
          </div>
          <p class="text-lg leading-relaxed text-gray-700">
            Queremos ser la principal opción financiera para estudiantes universitarios en el país.
            Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención al
            cliente y nuestro compromiso con la educación y el desarrollo social.
          </p>
        </article>
      </div>

      <article class="mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div class="mb-6 flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="m9 12 2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-primary sm:text-3xl">Nuestros Objetivos</h2>
        </div>
        <ul class="space-y-4">
          <li v-for="(objetivo, index) in objetivos" :key="index" class="flex items-start gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">
              {{ index + 1 }}
            </span>
            <p class="text-lg leading-relaxed text-gray-700">
              {{ objetivo }}
            </p>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

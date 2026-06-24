<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const openIndex = ref(0)

const faqs = [
  {
    question: '¿Cómo puedo abrir una cuenta?',
    answer: 'Abrir una cuenta es muy sencillo. Solo necesitas descargar nuestra app, tener tu identificación oficial y ser mayor de 18 años. El proceso toma menos de 5 minutos y es 100% digital.',
  },
  {
    question: '¿Hay costos de mantenimiento?',
    answer: 'La Cuenta Estudiante es completamente gratis, sin costos de apertura ni mantenimiento mensual. Solo pagas lo que usas, sin comisiones ocultas.',
  },
  {
    question: '¿Qué documentos necesito?',
    answer: 'Solo necesitas tu identificación oficial vigente (INE/Pasaporte) y una selfie para verificar tu identidad. Si eres estudiante, puedes adjuntar tu credencial universitaria para acceder a beneficios adicionales.',
  },
  {
    question: '¿Puedo usar mi tarjeta en el extranjero?',
    answer: 'Sí, tu tarjeta funciona en todo el mundo donde se acepten tarjetas Visa/Mastercard. Las cuentas Premium y Plus incluyen beneficios adicionales para viajeros.',
  },
  {
    question: '¿Cómo funciona el cashback?',
    answer: 'El cashback es un porcentaje de tus compras que regresamos a tu cuenta automáticamente. El porcentaje varía según tu plan: 1% en Cuenta Plus y 2% en Cuenta Premium.',
  },
  {
    question: '¿Qué tan segura es la aplicación?',
    answer: 'Utilizamos encriptación de nivel bancario, autenticación biométrica y monitoreo 24/7. Cada transacción genera una notificación instantánea y puedes bloquear tu tarjeta desde la app en cualquier momento.',
  },
]

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="bg-gray-50 py-8 lg:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 lg:mb-16 text-center">
        <h2 class="mb-4 text-3xl text-primary sm:text-4xl lg:text-5xl">
          Preguntas Frecuentes
        </h2>
        <p class="text-xl text-gray-600">
          Encuentra respuestas a las dudas más comunes
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden rounded-xl bg-white shadow-sm transition-all"
        >
          <h3>
            <button
              :id="`faq-button-${index}`"
              type="button"
              class="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-panel-${index}`"
              @click="toggleFaq(index)"
            >
              <span class="pr-8 text-lg text-primary">{{ faq.question }}</span>
              <ChevronDown
                class="h-5 w-5 shrink-0 text-secondary transition-transform"
                :class="{ 'rotate-180': openIndex === index }"
                aria-hidden="true"
              />
            </button>
          </h3>

          <div
            :id="`faq-panel-${index}`"
            role="region"
            :aria-labelledby="`faq-button-${index}`"
            :hidden="openIndex !== index"
            class="overflow-hidden transition-all duration-300"
            :class="openIndex === index ? 'max-h-96' : 'max-h-0'"
          >
            <div class="px-6 pb-5 leading-relaxed text-gray-600">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="mb-4 text-gray-600">
          ¿No encontraste lo que buscabas?
        </p>
        <RouterLink to="/contacto" class="inline-block rounded-lg bg-secondary px-6 py-3 text-white transition-colors hover:bg-primary">
          Contactar soporte
        </RouterLink>
      </div>
    </div>
  </section>
</template>

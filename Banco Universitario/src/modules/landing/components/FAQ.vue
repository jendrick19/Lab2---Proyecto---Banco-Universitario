<script setup>
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const openIndex = ref(0);

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
];

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-[#085163] mb-4">
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
          class="bg-white rounded-xl shadow-sm overflow-hidden transition-all"
        >
          <button
            class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            @click="toggleFaq(index)"
          >
            <span class="text-lg text-[#085163] pr-8">{{ faq.question }}</span>
            <ChevronDown
              class="h-5 w-5 text-[#49beb7] flex-shrink-0 transition-transform"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          
          <div
            class="overflow-hidden transition-all duration-300"
            :class="openIndex === index ? 'max-h-96' : 'max-h-0'"
          >
            <div class="px-6 pb-5 text-gray-600 leading-relaxed">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">
          ¿No encontraste lo que buscabas?
        </p>
        <button class="px-6 py-3 bg-[#49beb7] text-white rounded-lg hover:bg-[#085163] transition-colors">
          Contactar soporte
        </button>
      </div>
    </div>
  </section>
</template>

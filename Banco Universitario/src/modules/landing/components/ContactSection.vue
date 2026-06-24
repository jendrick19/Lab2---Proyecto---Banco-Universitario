<script setup>
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-vue-next'
import ContactInfoCard from '@/modules/landing/components/ContactInfoCard.vue'
import ContactForm from '@/shared/components/forms/ContactForm.vue'

const contactInfo = [
  {
    title: 'Dirección',
    value: 'Av. Universidad, Edificio Banco Universitario, piso 12, Caracas',
    icon: MapPin,
    iconBgClass: 'bg-secondary',
  },
  {
    title: 'Teléfono',
    value: '+58 212-555-5555',
    icon: Phone,
    href: 'tel:+582125555555',
    iconBgClass: 'bg-secondary',
  },
  {
    title: 'Correo Electrónico',
    value: 'info@bancouniversitario.com.ve',
    href: 'mailto:info@bancouniversitario.com.ve',
    icon: Mail,
    iconBgClass: 'bg-secondary',
  },
]

const onContactSubmit = () => {}
</script>

<template>
  <div id="contacto">
    <!-- Encabezado Principal -->
    <section class="bg-gradient-to-br from-gray-50 to-white pt-8 pb-4 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl mb-6 text-primary">
          Estamos para apoyarte
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Nuestro equipo está disponible para resolver tus dudas y ayudarte en lo que necesites
        </p>
      </div>
    </section>

    <!-- Formulario y Datos de Contacto -->
    <section class="pt-4 pb-8 lg:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Formulario - Lado Izquierdo -->
          <div>
            <ContactForm @submitted="onContactSubmit" />
          </div>

          <!-- Datos Oficiales - Lado Derecho -->
          <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl mb-6 text-primary">
              Información de contacto
            </h2>

            <!-- Cards -->
            <ContactInfoCard
              v-for="item in contactInfo"
              :key="item.title"
              :title="item.title"
              :value="item.value"
              :href="item.href"
              :icon="item.icon"
              :iconBgClass="item.iconBgClass"
            />

            <!-- Horario de Atención -->
            <div class="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
              <h3 class="text-lg font-semibold mb-3 text-primary">
                Horario de Atención
              </h3>
              <div class="space-y-2 text-gray-700">
                <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                <p>Sábados: 9:00 AM - 1:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Redes Sociales y Mapa -->
    <section class="py-8 lg:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Redes Sociales -->
        <div class="text-center mb-8 lg:mb-12">
          <h2 class="text-2xl sm:text-3xl mb-6 text-primary">
            Síguenos en redes sociales
          </h2>
          <p class="text-gray-600 mb-8">
            Mantente al día con nuestras novedades y promociones exclusivas
          </p>
          <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a
              href="https://facebook.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center bg-secondary transition-all">
                <Facebook class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
            <a
              href="https://instagram.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center bg-secondary transition-all">
                <Instagram class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
            <a
              href="https://twitter.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center bg-secondary transition-all">
                <Twitter class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
          </div>
        </div>

        <!-- Mapa -->
        <div class="mt-8 lg:mt-12">
          <h2 class="text-2xl sm:text-3xl text-center mb-8 text-primary">
            Nuestra Ubicación
          </h2>
          <div class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
            <div class="relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <!-- Simulación de mapa -->
              <div class="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                  alt="Vista aérea de Caracas"
                  class="w-full h-full object-cover opacity-60"
                />
              </div>
              <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                    <MapPin class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-primary">
                      Banco Universitario
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela
                    </p>
                    <button
                      type="button"
                      class="mt-4 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary"
                    >
                      Ver en Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-vue-next'
import ContactInfoCard from '@/modules/landing/components/ContactInfoCard.vue'
import ContactForm from '@/shared/components/forms/ContactForm.vue'

const contactInfo = [
  {
    title: 'Direccion',
    value: 'Av. Universidad, Edificio Banco Universitario, piso 12, Caracas',
    icon: MapPin,
    iconBgClass: 'bg-[#49beb7]',
  },
  {
    title: 'Telefono',
    value: '+58 212-555-5555',
    icon: Phone,
    href: 'tel:+582125555555',
    iconBgClass: 'bg-[#49beb7]',
  },
  {
    title: 'Correo electronico',
    value: 'info@bancouniversitario.com.ve',
    href: 'mailto:info@bancouniversitario.com.ve',
    icon: Mail,
    iconBgClass: 'bg-[#49beb7]',
  },
]

const socialLinks = [
  {
    name: 'Facebook',
    handle: '@bancouniversitariove',
    href: 'https://facebook.com/bancouniversitariove',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    handle: '@bancouniversitariove',
    href: 'https://instagram.com/bancouniversitariove',
    icon: Instagram,
  },
  {
    name: 'Twitter',
    handle: '@bancouniversitariove',
    href: 'https://twitter.com/bancouniversitariove',
    icon: Twitter,
  },
]

const onContactSubmit = () => {}
</script>

<template>
  <section id="contacto" class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-10 rounded-3xl bg-white px-6 py-12 text-center shadow-sm sm:px-10 lg:px-16">
        <h2 class="mb-4 text-4xl text-[#085f63] sm:text-5xl lg:text-6xl">Estamos para apoyarte</h2>
        <p class="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
          Nuestro equipo esta disponible para resolver tus dudas y ayudarte en lo que necesites.
        </p>
      </div>

      <div class="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ContactForm @submitted="onContactSubmit" />

        <div class="space-y-4 lg:space-y-6">
          <h3 class="text-2xl text-[#085f63] sm:text-3xl">Informacion de contacto</h3>
          <ContactInfoCard
            v-for="item in contactInfo"
            :key="item.title"
            :title="item.title"
            :value="item.value"
            :href="item.href"
            :icon="item.icon"
            :icon-bg-class="item.iconBgClass"
          />

          <div class="rounded-xl border border-[#085f63]/20 bg-linear-to-br from-[#085f63]/5 to-[#49beb7]/10 p-6">
            <h4 class="mb-3 text-lg font-semibold text-[#085f63]">Horario de atencion</h4>
            <div class="space-y-1 text-gray-700">
              <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
              <p>Sabados: 9:00 AM - 1:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-12 rounded-2xl bg-white p-8 text-center shadow-sm">
        <h3 class="mb-4 text-2xl text-[#085f63] sm:text-3xl">Siguenos en redes sociales</h3>
        <p class="mb-8 text-gray-600">
          Mantente al dia con nuestras novedades y promociones exclusivas.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-2"
          >
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#49beb7] transition-colors group-hover:bg-[#085f63]">
              <component :is="social.icon" class="h-8 w-8 text-white" />
            </div>
            <span class="text-sm text-gray-600 transition-colors group-hover:text-[#085f63]">
              {{ social.handle }}
            </span>
          </a>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div class="relative flex min-h-[320px] items-center justify-center bg-gray-100 sm:min-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
            alt="Vista aerea de Caracas"
            class="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div class="relative z-10 mx-4 max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div class="flex items-start gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#085f63]">
                <MapPin class="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 class="mb-2 text-lg font-semibold text-[#085f63]">Banco Universitario</h4>
                <p class="text-sm leading-relaxed text-gray-600">
                  Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela
                </p>
                <a
                  href="https://maps.google.com/?q=Av.+Universidad,+Caracas"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-4 inline-flex rounded-lg bg-[#49beb7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#085f63]"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

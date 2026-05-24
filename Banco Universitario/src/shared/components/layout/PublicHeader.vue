<script setup>
import { ref } from 'vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import logoImg from '@/assets/logo-no-background.png'

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="logoImg" alt="Banco Universitario" class="h-12 w-auto" />
          </RouterLink>
        </div>

        <div class="hidden md:flex md:items-center md:space-x-8">
          <a href="#inicio" class="text-[#085f63] transition-colors hover:text-[#49beb7]">Inicio</a>
          <a href="#nosotros" class="text-[#085f63] transition-colors hover:text-[#49beb7]">Nosotros</a>
          <a href="#servicios" class="text-[#085f63] transition-colors hover:text-[#49beb7]">Servicios</a>
          <RouterLink to="/contacto" class="text-[#085f63] transition-colors hover:text-[#49beb7]">Contacto</RouterLink>
        </div>

        <div class="hidden md:flex md:items-center md:space-x-4">
          <AppButton size="md" to="/login" variant="outline">Ingresar</AppButton>
          <AppButton size="md" to="/registro" variant="primary">Registrarse</AppButton>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-[#085f63] transition-colors hover:bg-gray-100 hover:text-[#49beb7] md:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-label="Abrir menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>

    <div v-if="mobileMenuOpen" class="border-t border-gray-200 bg-white md:hidden">
      <div class="space-y-2 px-4 pb-4 pt-2">
        <a href="#inicio" class="block rounded-md px-3 py-2 text-[#085f63] transition-colors hover:bg-[#49beb7] hover:text-white" @click="mobileMenuOpen = false">Inicio</a>
        <a href="#nosotros" class="block rounded-md px-3 py-2 text-[#085f63] transition-colors hover:bg-[#49beb7] hover:text-white" @click="mobileMenuOpen = false">Nosotros</a>
        <a href="#servicios" class="block rounded-md px-3 py-2 text-[#085f63] transition-colors hover:bg-[#49beb7] hover:text-white" @click="mobileMenuOpen = false">Servicios</a>
        <RouterLink to="/contacto" class="block rounded-md px-3 py-2 text-[#085f63] transition-colors hover:bg-[#49beb7] hover:text-white" @click="mobileMenuOpen = false">Contacto</RouterLink>
        <div class="space-y-2 pt-4">
          <AppButton size="md" to="/login" variant="outline" class="w-full" @click="mobileMenuOpen = false">Ingresar</AppButton>
          <AppButton size="md" to="/registro" variant="primary" class="w-full" @click="mobileMenuOpen = false">Registrarse</AppButton>
        </div>
      </div>
    </div>
  </header>
</template>

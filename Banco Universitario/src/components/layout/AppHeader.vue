<script setup>
import { ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import logoImg from '@/assets/logo-no-background.png'

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center">
            <img :src="logoImg" alt="Banco Universitario" class="h-12 w-auto" />
          </a>
        </div>

        <!-- Navegación desktop -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <a href="#inicio"    class="text-[#085f63] hover:text-[#49beb7] transition-colors">Inicio</a>
          <a href="#nosotros"  class="text-[#085f63] hover:text-[#49beb7] transition-colors">Nosotros</a>
          <a href="#servicios" class="text-[#085f63] hover:text-[#49beb7] transition-colors">Servicios</a>
          <a href="#contacto"  class="text-[#085f63] hover:text-[#49beb7] transition-colors">Contacto</a>
        </div>

        <!-- Botones CTA desktop -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <AppButton size="md" href="/login"    variant="outline">Ingresar</AppButton>
          <AppButton size="md" href="/registro" variant="primary">Registrarse</AppButton>
        </div>

        <!-- Botón hamburguesa (móvil) -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-[#085f63] hover:text-[#49beb7] hover:bg-gray-100 transition-colors"
          :aria-expanded="mobileMenuOpen"
          aria-label="Abrir menú"
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

    <!-- Menú móvil -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-4 pt-2 pb-4 space-y-2">
        <a href="#inicio"    class="block px-3 py-2 text-[#085f63] hover:bg-[#49beb7] hover:text-white rounded-md transition-colors" @click="mobileMenuOpen = false">Inicio</a>
        <a href="#nosotros"  class="block px-3 py-2 text-[#085f63] hover:bg-[#49beb7] hover:text-white rounded-md transition-colors" @click="mobileMenuOpen = false">Nosotros</a>
        <a href="#servicios" class="block px-3 py-2 text-[#085f63] hover:bg-[#49beb7] hover:text-white rounded-md transition-colors" @click="mobileMenuOpen = false">Servicios</a>
        <a href="#contacto"  class="block px-3 py-2 text-[#085f63] hover:bg-[#49beb7] hover:text-white rounded-md transition-colors" @click="mobileMenuOpen = false">Contacto</a>
        <div class="pt-4 space-y-2">
          <AppButton size="md" href="/login"    variant="outline" class="w-full" @click="mobileMenuOpen = false">Ingresar</AppButton>
          <AppButton size="md" href="/registro" variant="primary" class="w-full" @click="mobileMenuOpen = false">Registrarse</AppButton>
        </div>
      </div>
    </div>
  </header>
</template>

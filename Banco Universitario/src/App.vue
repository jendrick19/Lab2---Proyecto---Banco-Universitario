<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppHero from '@/components/layout/AppHero.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1">
      <AppHero />
    </main>
    <AppFooter />
  </div>
</template>

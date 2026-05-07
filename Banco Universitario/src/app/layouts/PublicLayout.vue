<script setup>
import PublicHeader from '@/shared/components/layout/PublicHeader.vue'
import PublicFooter from '@/shared/components/layout/PublicFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PublicHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <PublicFooter />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: 'bg-[#49beb7]',
  },
  cardClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm" :class="cardClass">
    <div class="flex items-start gap-4">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" :class="iconBgClass">
        <component :is="icon" class="h-6 w-6" />
      </div>
      <div>
        <p class="mb-2 text-lg font-semibold text-[#085f63]">{{ title }}</p>
        <a
          v-if="href"
          :href="href"
          class="text-gray-700 transition-colors hover:text-[#49beb7]"
        >
          {{ value }}
        </a>
        <p v-else class="text-gray-700">{{ value }}</p>
        <p v-if="description" class="mt-1 text-sm text-gray-500">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

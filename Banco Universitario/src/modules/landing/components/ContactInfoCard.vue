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
  icon: {
    type: Object,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: 'bg-[#49beb7]',
  },
})
</script>

<template>
  <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
    <div class="flex items-start gap-4">
      <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" :class="iconBgClass">
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2" style="color: #085f63">
          {{ title }}
        </h3>
        <a
          v-if="href"
          :href="href"
          class="text-gray-700 hover:text-secondary transition-colors break-all"
        >
          {{ value }}
        </a>
        <p v-else class="text-gray-700 leading-relaxed">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>

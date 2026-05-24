<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 5,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label :for="id" class="mb-2 block text-sm font-medium text-[#085163]">
      {{ label }}
    </label>
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-[#49beb7] focus:outline-none focus:ring-2 focus:ring-[#49beb7]/30"
      @input="onInput"
    />
  </div>
</template>

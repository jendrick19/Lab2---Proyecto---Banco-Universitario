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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
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
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete"
      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-[#49beb7] focus:outline-none focus:ring-2 focus:ring-[#49beb7]/30"
      @input="onInput"
    />
  </div>
</template>

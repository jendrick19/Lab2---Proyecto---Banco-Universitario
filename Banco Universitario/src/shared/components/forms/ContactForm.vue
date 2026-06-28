<script setup>
import { reactive, ref } from 'vue'
import { Send } from 'lucide-vue-next'
import AppButton from '@/shared/components/ui/AppButton.vue'
import AppInputField from '@/shared/components/ui/AppInputField.vue'
import AppTextareaField from '@/shared/components/ui/AppTextareaField.vue'
import { validateContactForm } from '@/shared/utils/contactFormValidation'

const emit = defineEmits(['submitted'])

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const feedback = ref({
  type: '',
  message: '',
})

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
}

const clearFieldError = (field) => {
  errors[field] = ''
  if (feedback.value.type === 'error') {
    feedback.value = { type: '', message: '' }
  }
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  clearErrors()
}

const handleSubmit = () => {
  clearErrors()

  const validationErrors = validateContactForm(form)
  const errorKeys = Object.keys(validationErrors)

  if (errorKeys.length > 0) {
    errorKeys.forEach((key) => {
      errors[key] = validationErrors[key]
    })
    feedback.value = {
      type: 'error',
      message: 'Revisa los campos marcados antes de enviar.',
    }
    return
  }

  emit('submitted', {
    name: form.name.trim(),
    email: form.email.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
  })

  feedback.value = {
    type: 'success',
    message: 'Mensaje enviado con éxito. Te responderemos pronto.',
  }

  resetForm()
}
</script>

<template>
  <form class="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:p-8" @submit.prevent="handleSubmit" novalidate>
    <h3 class="text-2xl text-primary sm:text-3xl">Envíanos un mensaje</h3>

    <AppInputField
      id="contacto-nombre"
      v-model="form.name"
      label="Nombre completo"
      placeholder="Tu nombre completo"
      autocomplete="name"
      :error="errors.name"
      @update:model-value="clearFieldError('name')"
    />

    <AppInputField
      id="contacto-correo"
      v-model="form.email"
      type="email"
      label="Correo electrónico"
      placeholder="tucorreo@ejemplo.com"
      autocomplete="email"
      :error="errors.email"
      @update:model-value="clearFieldError('email')"
    />

    <AppInputField
      id="contacto-asunto"
      v-model="form.subject"
      label="Asunto"
      placeholder="¿En qué podemos ayudarte?"
      :error="errors.subject"
      @update:model-value="clearFieldError('subject')"
    />

    <AppTextareaField
      id="contacto-mensaje"
      v-model="form.message"
      label="Mensaje"
      placeholder="Escribe tu mensaje aquí..."
      :rows="6"
      :error="errors.message"
      @update:model-value="clearFieldError('message')"
    />

    <div
      v-if="feedback.message"
      role="alert"
      class="rounded-lg border px-4 py-3 text-sm"
      :class="feedback.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'"
    >
      {{ feedback.message }}
    </div>

    <AppButton type="submit" variant="primary" size="lg" class="w-full">
      <Send class="h-5 w-5" />
      Enviar mensaje
    </AppButton>
  </form>
</template>

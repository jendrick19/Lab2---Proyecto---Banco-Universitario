<script setup>
import { reactive, ref } from 'vue'
import { Send } from 'lucide-vue-next'
import AppButton from '@/shared/components/ui/AppButton.vue'
import AppInputField from '@/shared/components/ui/AppInputField.vue'
import AppTextareaField from '@/shared/components/ui/AppTextareaField.vue'

const emit = defineEmits(['submitted'])

const form = reactive({
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: '',
})

const feedback = ref({
  type: '',
  message: '',
})

const resetForm = () => {
  form.nombre = ''
  form.correo = ''
  form.asunto = ''
  form.mensaje = ''
}

const handleSubmit = () => {
  if (!form.nombre.trim() || !form.correo.trim() || !form.asunto.trim() || !form.mensaje.trim()) {
    feedback.value = {
      type: 'error',
      message: 'Completa todos los campos para enviar tu mensaje.',
    }
    return
  }

  emit('submitted', { ...form })

  feedback.value = {
    type: 'success',
    message: 'Mensaje enviado con exito. Te responderemos pronto.',
  }

  resetForm()
}
</script>

<template>
  <form class="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md lg:p-8" @submit.prevent="handleSubmit">
    <h3 class="text-2xl text-[#085f63] sm:text-3xl">Envianos un mensaje</h3>

    <AppInputField
      id="contacto-nombre"
      v-model="form.nombre"
      label="Nombre completo"
      placeholder="Tu nombre completo"
      autocomplete="name"
    />

    <AppInputField
      id="contacto-correo"
      v-model="form.correo"
      type="email"
      label="Correo electronico"
      placeholder="tucorreo@ejemplo.com"
      autocomplete="email"
    />

    <AppInputField
      id="contacto-asunto"
      v-model="form.asunto"
      label="Asunto"
      placeholder="En que podemos ayudarte"
    />

    <AppTextareaField
      id="contacto-mensaje"
      v-model="form.mensaje"
      label="Mensaje"
      placeholder="Escribe tu mensaje aqui..."
      :rows="6"
    />

    <div
      v-if="feedback.message"
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

<script setup>
import { ref, computed } from 'vue'
import { Search, X, Users, UserPlus } from 'lucide-vue-next'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  contacts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'select'])

const search = ref('')

// Filtra la agenda por alias o número de cuenta a medida que el usuario escribe.
const filteredContacts = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return props.contacts
  return props.contacts.filter(
    (c) =>
      c.alias?.toLowerCase().includes(term) ||
      c.account_number?.includes(term),
  )
})

const handleSelect = (contact) => {
  emit('select', contact)
  search.value = ''
}

const handleClose = () => {
  search.value = ''
  emit('close')
}

// Muestra el número de cuenta agrupado de a 4 dígitos para facilitar la lectura.
const formatAccount = (account) => (account ? account.replace(/(.{4})/g, '$1 ').trim() : '')
</script>

<template>
  <div v-if="open">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" @click="handleClose"></div>

    <!-- Modal -->
    <div class="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full flex flex-col max-h-[80vh]" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-6 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center">
              <Users class="w-5 h-5 text-secondary" />
            </div>
            <h2 class="text-lg font-semibold text-primary">Mis Contactos</h2>
          </div>
          <button
            type="button"
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Buscador -->
        <div class="px-6 pb-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Buscar por nombre o cuenta"
              class="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
            />
          </div>
        </div>

        <!-- Lista de contactos -->
        <div class="px-6 pb-6 overflow-y-auto">
          <!-- Cargando -->
          <div v-if="loading" class="py-10 text-center text-gray-500 text-sm">
            Cargando contactos...
          </div>

          <!-- Agenda vacía -->
          <div v-else-if="contacts.length === 0" class="py-10 flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <UserPlus class="w-7 h-7 text-gray-400" />
            </div>
            <p class="text-gray-600 font-medium">Aún no tienes contactos</p>
            <p class="text-sm text-gray-500 mt-1">
              Podrás agendar beneficiarios después de una transferencia.
            </p>
          </div>

          <!-- Sin resultados de búsqueda -->
          <div v-else-if="filteredContacts.length === 0" class="py-10 text-center text-gray-500 text-sm">
            No se encontraron contactos para «{{ search }}».
          </div>

          <!-- Contactos -->
          <ul v-else class="space-y-2">
            <li v-for="contact in filteredContacts" :key="contact.id">
              <button
                type="button"
                @click="handleSelect(contact)"
                class="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all text-left"
              >
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span class="text-primary font-semibold text-sm">
                    {{ contact.alias?.charAt(0).toUpperCase() || '?' }}
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-gray-900 truncate">{{ contact.alias }}</p>
                  <p class="text-xs text-gray-500 font-mono truncate">
                    {{ formatAccount(contact.account_number) }}
                  </p>
                  <p v-if="contact.description" class="text-xs text-gray-400 truncate">
                    {{ contact.description }}
                  </p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

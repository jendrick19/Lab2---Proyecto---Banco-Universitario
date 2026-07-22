<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getContacts, createContact, updateContact, deleteContact } from '../services/contactsService'
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { getUser, clearSession } from '@/shared/utils/authStorage'

import DashboardSidebar from '@/modules/dashboard/components/DashboardSidebar.vue'
import DashboardHeader from '@/modules/dashboard/components/DashboardHeader.vue'
import ContactFormModal from '../components/ContactFormModal.vue'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'
import SuccessAlert from '../components/SuccessAlert.vue'

const router = useRouter()
const user = getUser()
const showLogoutModal = ref(false)

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  clearSession()
  router.push('/iniciar-sesion')
}

const cancelLogout = () => {
  showLogoutModal.value = false
}

// Contacts state
const searchTerm = ref('')
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingContact = ref(null)
const deletingContact = ref(null)
const currentPage = ref(1)
const alertMessage = ref(null)
const itemsPerPage = 20

const contactos = ref([])
const isLoading = ref(false)

const fetchContacts = async () => {
  isLoading.value = true
  try {
    const data = await getContacts()
    contactos.value = data.map(c => ({
      ...c,
      cuenta: c.account_number,
      descripcion: c.description
    }))
  } catch (error) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchContacts()
})

const filteredContactos = computed(() => {
  return contactos.value.filter(contacto =>
    contacto.alias.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const totalPages = computed(() => Math.ceil(filteredContactos.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const currentContactos = computed(() => filteredContactos.value.slice(startIndex.value, endIndex.value))
const totalContactos = computed(() => filteredContactos.value.length)

const handleAddContact = () => {
  editingContact.value = null
  showFormModal.value = true
}

const handleEditContact = (contacto) => {
  editingContact.value = contacto
  showFormModal.value = true
}

const handleDeleteClick = (contacto) => {
  deletingContact.value = contacto
  showDeleteModal.value = true
}

const handleSaveContact = async (contactoData) => {
  const isEditing = !!editingContact.value
  
  try {
    if (isEditing) {
      await updateContact(editingContact.value.id, {
        alias: contactoData.alias,
        description: contactoData.descripcion
      })
    } else {
      await createContact({
        accountNumber: contactoData.cuenta,
        alias: contactoData.alias,
        description: contactoData.descripcion
      })
    }
    
    showFormModal.value = false
    await fetchContacts()
    
    setTimeout(() => {
      alertMessage.value = isEditing ? 'edit' : 'add'
    }, 500)
  } catch (error) {
    alert(error.message)
  }
}

const handleConfirmDelete = async () => {
  if (deletingContact.value) {
    try {
      await deleteContact(deletingContact.value.id)
      showDeleteModal.value = false
      deletingContact.value = null
      await fetchContacts()
      
      setTimeout(() => {
        alertMessage.value = 'delete'
      }, 500)
    } catch (error) {
      alert(error.message)
    }
  }
}

const alertMessageText = computed(() => {
  switch (alertMessage.value) {
    case 'add': return 'Contacto agregado exitosamente'
    case 'edit': return 'Contacto editado exitosamente'
    case 'delete': return 'Contacto borrado exitosamente'
    default: return ''
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <DashboardSidebar :on-logout="handleLogout" />

    <div class="flex-1 flex flex-col ml-72">
      <DashboardHeader :user="user" />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-7xl mx-auto px-8 py-8">
          <!-- Cabecera -->
          <div class="mb-8">
            <h1 class="text-3xl font-semibold mb-6" style="color: #085f63;">
              Directorio de Contactos
            </h1>

            <div class="flex gap-4 items-center">
              <!-- Buscador -->
              <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por alias..."
                  v-model="searchTerm"
                  @input="currentPage = 1"
                  class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                />
              </div>

              <!-- Botón Agregar -->
              <button
                @click="handleAddContact"
                class="px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 whitespace-nowrap"
                style="background-color: #085f63;"
              >
                <Plus class="w-5 h-5" />
                Agregar Contacto
              </button>
            </div>
          </div>

          <!-- Tabla de Contactos -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Alias</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Número de Cuenta</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-if="currentContactos.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                      {{ searchTerm ? 'No se encontraron contactos' : 'No hay contactos registrados' }}
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="contacto in currentContactos"
                    :key="contacto.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <span class="font-medium text-gray-900">{{ contacto.alias }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="font-mono text-sm text-gray-600">{{ contacto.cuenta }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="text-gray-600">{{ contacto.descripcion }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          @click="handleEditContact(contacto)"
                          class="p-2 rounded-lg text-gray-600 hover:bg-secondary/10 hover:text-secondary transition-colors"
                          title="Editar contacto"
                        >
                          <Pencil class="w-4 h-4" />
                        </button>
                        <button
                          @click="handleDeleteClick(contacto)"
                          class="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Eliminar contacto"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Paginación -->
            <div v-if="totalContactos > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div class="text-sm text-gray-600">
                Mostrando {{ startIndex + 1 }}-{{ Math.min(endIndex, totalContactos) }} de {{ totalContactos }} contactos
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft class="w-5 h-5" />
                </button>
                <span class="px-4 py-2 text-sm font-medium text-gray-700">
                  Página {{ currentPage }} de {{ totalPages }}
                </span>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de Formulario -->
    <ContactFormModal
      :open="showFormModal"
      :contact="editingContact"
      @close="showFormModal = false"
      @save="handleSaveContact"
    />

    <!-- Modal de Confirmación de Eliminación -->
    <DeleteConfirmModal
      :open="showDeleteModal"
      :contactName="deletingContact?.alias || ''"
      @close="showDeleteModal = false; deletingContact = null"
      @confirm="handleConfirmDelete"
    />

    <!-- Alerta de Éxito -->
    <SuccessAlert
      v-if="alertMessage"
      :message="alertMessageText"
      @close="alertMessage = null"
    />

    <!-- Modal de Cerrar Sesión -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4">
        <h2 class="text-xl font-bold text-gray-800 mb-2">¿Cerrar Sesión?</h2>
        <p class="text-gray-600 mb-6">¿Estás seguro de que deseas salir de tu cuenta?</p>

        <div class="flex items-center justify-end gap-3">
          <button
            @click="cancelLogout"
            class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmLogout"
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            Sí, cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

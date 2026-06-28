import ContactsView from '@/modules/contacts/views/ContactsView.vue'

export const contactsRoutes = [
  {
    path: '/contactos',
    name: 'contactos',
    component: ContactsView,
    meta: { requiresAuth: true },
  },
]

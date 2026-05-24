import LandingView from '@/modules/landing/views/LandingView.vue'
import ContactoView from '@/modules/landing/views/ContactoView.vue'

export const landingRoutes = [
  {
    path: '',
    name: 'landing',
    component: LandingView,
  },
  {
    path: 'contacto',
    name: 'contacto',
    component: ContactoView,
  },
]

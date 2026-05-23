import LandingView from '@/modules/landing/views/LandingView.vue'
import ContactView from '@/modules/landing/views/ContactView.vue'

export const landingRoutes = [
  {
    path: '',
    name: 'landing',
    component: LandingView,
  },
  {
    path: 'contacto',
    name: 'contacto',
    component: ContactView,
  },
]

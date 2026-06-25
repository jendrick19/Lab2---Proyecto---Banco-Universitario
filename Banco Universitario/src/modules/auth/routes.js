import LoginView from '@/modules/auth/views/LoginView.vue'
import RegisterView from '@/modules/auth/views/RegisterView.vue'
import RecuperarClaveView from '@/modules/auth/views/RecuperarClaveView.vue'

export const authRoutes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegisterView,
    meta: { guestOnly: true },
  },
  {
    path: '/recuperar-clave',
    name: 'recuperar-clave',
    component: RecuperarClaveView,
    meta: { guestOnly: true },
  },
]

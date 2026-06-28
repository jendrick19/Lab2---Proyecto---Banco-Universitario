import LoginView from '@/modules/auth/views/LoginView.vue'
import RegisterView from '@/modules/auth/views/RegisterView.vue'
import ResetPasswordView from '@/modules/auth/views/ResetPasswordView.vue'

export const authRoutes = [
  {
    path: '/iniciar-sesion',
    name: 'iniciar-sesion',
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
    component: ResetPasswordView,
    meta: { guestOnly: true },
  },
]

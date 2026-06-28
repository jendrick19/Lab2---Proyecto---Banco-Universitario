import ProfileView from '@/modules/profile/views/ProfileView.vue'

export const profileRoutes = [
  {
    path: '/perfil',
    name: 'perfil',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
]

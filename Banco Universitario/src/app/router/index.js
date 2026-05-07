import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/app/layouts/PublicLayout.vue'
import { landingRoutes } from '@/modules/landing/routes'
import { authRoutes } from '@/modules/auth/routes'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: landingRoutes,
  },
  ...authRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

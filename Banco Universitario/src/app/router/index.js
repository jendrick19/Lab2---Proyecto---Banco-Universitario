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
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }

    return { top: 0, behavior: 'smooth' }
  },
})

export default router

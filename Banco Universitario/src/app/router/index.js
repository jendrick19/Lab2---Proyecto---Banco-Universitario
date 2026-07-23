import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/app/layouts/PublicLayout.vue'
import { landingRoutes } from '@/modules/landing/routes'
import { authRoutes } from '@/modules/auth/routes'
import { dashboardRoutes } from '@/modules/dashboard/routes'
import { transferRoutes } from '@/modules/transfer/routes'
import { contactsRoutes } from '@/modules/contacts/routes'
import { profileRoutes } from '@/modules/profile/routes'
import { isAuthenticated } from '@/shared/utils/authStorage'
import { authGuard } from '@/app/router/authGuard'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: landingRoutes,
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...transferRoutes,
  ...contactsRoutes,
  ...profileRoutes,
  // Catch-all: cualquier URL desconocida redirige a la página principal.
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
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

// Guard global de autenticación (lógica en authGuard.js, función pura testeable).
router.beforeEach((to) => authGuard(to, isAuthenticated())) 
export default router

 

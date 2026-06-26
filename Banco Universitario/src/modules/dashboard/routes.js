import DashboardView from '@/modules/dashboard/views/DashboardView.vue'
import MovementsHistoryView from '@/modules/dashboard/views/MovementsHistoryView.vue'

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/movimientos',
    name: 'movimientos',
    component: MovementsHistoryView,
    meta: { requiresAuth: true },
  },
]
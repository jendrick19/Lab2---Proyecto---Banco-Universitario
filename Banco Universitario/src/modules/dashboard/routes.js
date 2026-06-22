import DashboardView from '@/modules/dashboard/views/DashboardView.vue'

export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
]

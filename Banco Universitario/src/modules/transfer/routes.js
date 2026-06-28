import TransferView from '@/modules/transfer/views/TransferView.vue'

export const transferRoutes = [
  {
    path: '/transferir',
    name: 'transferir',
    component: TransferView,
    meta: { requiresAuth: true },
  },
]

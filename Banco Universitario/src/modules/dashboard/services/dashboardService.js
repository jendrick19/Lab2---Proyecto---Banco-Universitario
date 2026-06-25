import apiClient from '@/shared/utils/apiClient'

export async function getDashboardData() {
  try {
    const [balanceRes, movementsRes] = await Promise.all([
      apiClient.get('/v1/client/user/balance'),
      apiClient.get('/v1/client/movement?page=1&page_size=20')
    ])

    return {
      balance: balanceRes.data?.data?.balance ?? 0,
      transactions: movementsRes.data?.data ?? []
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      balance: 0,
      transactions: []
    }
  }
}

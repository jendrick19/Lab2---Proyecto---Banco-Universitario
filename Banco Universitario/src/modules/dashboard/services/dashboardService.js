import apiClient from '@/shared/utils/apiClient'

/*
 * getMovements obtiene el historial de movimientos del usuario autenticado.
 * El backend (GET /v1/client/movement) responde con { message, errors, data },
 * donde data es el arreglo de movimientos. Cada movimiento incluye:
 * { id, amount, balance, multiplier, account_number, description, created_at }.
 * Lanza el error para que la vista pueda diferenciar fallo de "sin movimientos".
 */
export async function getMovements({ page = 1, pageSize = 100 } = {}) {
  const { data: body } = await apiClient.get(
    `/v1/client/movement?page=${page}&page_size=${pageSize}`
  )
  return body?.data ?? []
}

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

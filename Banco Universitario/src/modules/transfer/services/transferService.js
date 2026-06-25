import apiClient from '@/shared/utils/apiClient'

/*
 * getBalance obtiene el saldo disponible del usuario autenticado.
 * El backend responde con { message, errors, data: { balance } }.
 */
export async function getBalance() {
  try {
    const { data: body } = await apiClient.get('/v1/client/user/balance')
    return body?.data?.balance ?? 0
  } catch (error) {
    console.error('Error fetching balance:', error)
    return 0
  }
}

/*
 * createTransfer ejecuta una transferencia creando un movimiento de débito.
 * El backend (POST /v1/client/movement) descuenta el saldo del emisor y
 * acredita la cuenta destino. Espera { description, account_number, amount }.
 * Devuelve el movimiento creado o lanza un Error con un mensaje legible.
 */
export async function createTransfer({ accountNumber, amount, description }) {
  try {
    const { data: body } = await apiClient.post('/v1/client/movement', {
      account_number: accountNumber,
      amount: Number(amount),
      description,
    })
    return body?.data ?? {}
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'No se pudo completar la transferencia. Inténtalo de nuevo.'
    throw new Error(message)
  }
}

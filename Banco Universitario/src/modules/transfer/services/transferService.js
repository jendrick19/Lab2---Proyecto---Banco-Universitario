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
 * translateTransferError convierte el error crudo del backend en un mensaje
 * claro para el usuario. El API responde con { message } traducido; se mapea
 * por código HTTP (404 es inequívoco: cuenta inexistente) y, para los 400,
 * por el texto del mensaje, con un respaldo genérico.
 */
function translateTransferError(error) {
  const status = error.response?.status
  const apiMessage = error.response?.data?.message ?? ''

  if (status === 404) {
    return 'La cuenta ingresada no corresponde a ningún beneficiario.'
  }

  if (apiMessage.includes('propia billetera')) {
    return 'La cuenta ingresada es de tu propiedad. Ingresa una cuenta distinta a la tuya.'
  }

  if (apiMessage.includes('Saldo insuficiente')) {
    return 'No tienes saldo suficiente para realizar esta transferencia.'
  }

  return apiMessage || 'No se pudo completar la transferencia. Inténtalo de nuevo.'
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
    throw new Error(translateTransferError(error))
  }
}

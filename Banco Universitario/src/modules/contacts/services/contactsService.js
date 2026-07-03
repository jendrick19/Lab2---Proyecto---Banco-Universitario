import apiClient from '@/shared/utils/apiClient'

/*
 * Servicio de la agenda de contactos.
 * El backend expone un CRUD en /v1/client/contact. Cada contacto tiene la forma
 * { id, account_number, alias, description|null, created_at, updated_at }.
 * El contacto solo guarda el número de cuenta y un alias definido por el usuario;
 * el nombre real del beneficiario se resuelve aparte (getUserByAccount).
 */

/*
 * getContacts devuelve la lista de contactos del usuario autenticado.
 * Lanza el error para que la vista distinga "sin contactos" de un fallo real.
 */
export async function getContacts() {
  const { data: body } = await apiClient.get('/v1/client/contact')
  return body?.data ?? []
}

/*
 * translateContactError convierte el error crudo del backend en un mensaje
 * claro para el usuario, mapeado por código HTTP y texto del mensaje.
 */
function translateContactError(error) {
  const status = error.response?.status
  const apiMessage = error.response?.data?.message ?? ''

  if (status === 404) {
    return 'La cuenta ingresada no corresponde a ningún beneficiario.'
  }

  if (apiMessage.includes('Ya tienes agregado')) {
    return 'Este contacto ya está en tu agenda.'
  }

  return apiMessage || 'No se pudo guardar el contacto. Inténtalo de nuevo.'
}

/*
 * createContact agenda un nuevo contacto. El alias es obligatorio.
 * Espera { account_number, alias, description? } y devuelve el contacto creado
 * o lanza un Error con un mensaje legible.
 */
export async function createContact({ accountNumber, alias, description }) {
  try {
    const { data: body } = await apiClient.post('/v1/client/contact', {
      account_number: accountNumber,
      alias,
      ...(description ? { description } : {}),
    })
    return body?.data ?? {}
  } catch (error) {
    throw new Error(translateContactError(error))
  }
}

/*
 * updateContact edita el alias y/o la descripción de un contacto existente.
 */
export async function updateContact(id, { alias, description }) {
  try {
    const { data: body } = await apiClient.patch(`/v1/client/contact/${id}`, {
      alias,
      description,
    })
    return body?.data ?? {}
  } catch (error) {
    throw new Error(translateContactError(error))
  }
}

/*
 * deleteContact elimina un contacto de la agenda por su id.
 */
export async function deleteContact(id) {
  try {
    const { data: body } = await apiClient.delete(`/v1/client/contact/${id}`)
    return body?.data ?? {}
  } catch (error) {
    throw new Error(translateContactError(error))
  }
}

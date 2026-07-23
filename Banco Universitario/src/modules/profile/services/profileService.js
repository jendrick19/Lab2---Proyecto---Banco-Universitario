import apiClient from '@/shared/utils/apiClient'
import { saveSession } from '@/shared/utils/authStorage'

/*
 * getProfile obtiene los datos del usuario autenticado (RF-05).
 * El backend (GET /v1/client/user/whoami) responde con { message, errors, data },
 * donde data es { first_name, last_name, document_number, birth_date,
 * phone_number, email, account_number }.
 * Refresca la copia en localStorage para que el header quede sincronizado.
 */
export async function getProfile() {
  try {
    const { data: body } = await apiClient.get('/v1/client/user/whoami')
    const user = body?.data ?? {}
    saveSession({ user })
    return user
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'No se pudieron cargar los datos de tu perfil.'
    throw new Error(message)
  }
}

/*
 * updatePassword cambia la contraseña previa validación de la actual (RF-06).
 * El backend (PATCH /v1/client/user/password) espera { password, new_password }
 * y responde 401 cuando la contraseña actual es incorrecta. Se marca la petición
 * con skipSessionClear para que ese 401 no cierre la sesión del usuario.
 */
export async function updatePassword({ currentPassword, newPassword }) {
  try {
    const { data: body } = await apiClient.patch(
      '/v1/client/user/password',
      { password: currentPassword, new_password: newPassword },
      { skipSessionClear: true },
    )
    return body?.message ?? 'Contraseña actualizada con éxito'
  } catch (error) {
    const message =
      error.response?.status === 401
        ? 'La contraseña actual es incorrecta.'
        : error.response?.data?.message ||
          'No se pudo actualizar la contraseña. Inténtalo de nuevo.'
    throw new Error(message)
  }
}

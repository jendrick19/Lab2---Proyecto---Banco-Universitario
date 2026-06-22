import apiClient from '@/shared/utils/apiClient'
import { saveSession } from '@/shared/utils/authStorage'

/*
 * login envía las credenciales al endpoint público del API.
 * El backend responde con { message, errors, data: { ...usuario, jwt } }.
 * Guarda la sesión (jwt + usuario) en localStorage y devuelve los datos.
 */
export async function login({ email, password }) {
  try {
    const { data: body } = await apiClient.post('/v1/public/client/user/login', {
      email,
      password,
    })

    const data = body?.data ?? {}
    saveSession({ jwt: data.jwt, user: data })
    return data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'No se pudo iniciar sesión. Verifica tus credenciales.'
    throw new Error(message)
  }
}

export async function register(userData) {
  try {
    const { data: body } = await apiClient.post('/v1/public/client/user/register', userData)
    return body?.data ?? {}
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'No se pudo registrar el usuario. Inténtalo de nuevo.'
    throw new Error(message)
  }
}

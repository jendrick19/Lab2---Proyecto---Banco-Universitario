import { ref } from 'vue'

/*
 * Almacenamiento de sesión en localStorage.
 * NOTA: es una solución de prototipo. localStorage es accesible por JS y
 * vulnerable a XSS; para producción conviene usar cookies httpOnly.
 *
 * loggedIn es un ref reactivo: el header (y cualquier componente) puede
 * reaccionar a login/logout sin recargar la página.
 */

const TOKEN_KEY = 'bank_token'
const USER_KEY = 'bank_user'

export const loggedIn = ref(Boolean(localStorage.getItem(TOKEN_KEY)))

export function saveSession({ jwt, user }) {
  if (jwt) {
    localStorage.setItem(TOKEN_KEY, jwt)
    loggedIn.value = true
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  loggedIn.value = false
}

export function isAuthenticated() {
  return Boolean(getToken())
}

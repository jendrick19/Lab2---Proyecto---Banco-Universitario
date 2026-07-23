import axios from 'axios'
import { getToken, clearSession } from '@/shared/utils/authStorage'

// URL del bank-service (Go) corriendo en Docker. Sobreescribible con VITE_API_URL.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor de petición: inyecta el JWT en cada request si existe sesión.
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de respuesta: ante un 401, limpia la sesión local.
// Las peticiones marcadas con skipSessionClear quedan exentas: hay endpoints
// (p. ej. cambio de contraseña) donde el 401 significa "credencial incorrecta",
// no "sesión expirada", y cerrar la sesión sería incorrecto.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipSessionClear) {
      clearSession()
    }
    return Promise.reject(error)
  },
)

export default apiClient

/*
 * authGuard es una función pura: dada la ruta destino y si hay sesión,
 * devuelve la redirección correspondiente o `true` para dejar pasar.
 * Al no depender de localStorage ni del router, es fácil de testear.
 *
 *  - meta.requiresAuth + sin sesión  → /iniciar-sesion
 *  - meta.guestOnly    + con sesión  → /panel
 *  - en cualquier otro caso          → true (acceso permitido)
 */
export function authGuard(to, loggedIn) {
  if (to.meta?.requiresAuth && !loggedIn) {
    return { name: 'iniciar-sesion' }
  }

  if (to.meta?.guestOnly && loggedIn) {
    return { path: '/panel' }
  }

  return true
}

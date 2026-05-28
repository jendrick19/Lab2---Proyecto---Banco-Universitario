const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @param {{ nombre: string, correo: string, asunto: string, mensaje: string }} form
 * @returns {Record<string, string>}
 */
export function validateContactForm(form) {
  const errors = {}

  const nombre = form.nombre.trim()
  if (!nombre) {
    errors.nombre = 'El nombre es obligatorio.'
  } else if (nombre.length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres.'
  } else if (nombre.length > 80) {
    errors.nombre = 'El nombre no puede superar 80 caracteres.'
  } else if (!/^[\p{L}\s'.-]+$/u.test(nombre)) {
    errors.nombre = 'El nombre solo puede contener letras y espacios.'
  }

  const correo = form.correo.trim()
  if (!correo) {
    errors.correo = 'El correo es obligatorio.'
  } else if (!EMAIL_REGEX.test(correo)) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  } else if (correo.length > 120) {
    errors.correo = 'El correo no puede superar 120 caracteres.'
  }

  const asunto = form.asunto.trim()
  if (!asunto) {
    errors.asunto = 'El asunto es obligatorio.'
  } else if (asunto.length < 3) {
    errors.asunto = 'El asunto debe tener al menos 3 caracteres.'
  } else if (asunto.length > 100) {
    errors.asunto = 'El asunto no puede superar 100 caracteres.'
  }

  const mensaje = form.mensaje.trim()
  if (!mensaje) {
    errors.mensaje = 'El mensaje es obligatorio.'
  } else if (mensaje.length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  } else if (mensaje.length > 1000) {
    errors.mensaje = 'El mensaje no puede superar 1000 caracteres.'
  }

  return errors
}

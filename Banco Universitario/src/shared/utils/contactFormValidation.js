const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @param {{ name: string, email: string, subject: string, message: string }} form
 * @returns {Record<string, string>}
 */
export function validateContactForm(form) {
  const errors = {}

  const name = form.name.trim()
  if (!name) {
    errors.name = 'El nombre es obligatorio.'
  } else if (name.length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.'
  } else if (name.length > 80) {
    errors.name = 'El nombre no puede superar 80 caracteres.'
  } else if (!/^[\p{L}\s'.-]+$/u.test(name)) {
    errors.name = 'El nombre solo puede contener letras y espacios.'
  }

  const email = form.email.trim()
  if (!email) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  } else if (email.length > 120) {
    errors.email = 'El correo no puede superar 120 caracteres.'
  }

  const subject = form.subject.trim()
  if (!subject) {
    errors.subject = 'El asunto es obligatorio.'
  } else if (subject.length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres.'
  } else if (subject.length > 100) {
    errors.subject = 'El asunto no puede superar 100 caracteres.'
  }

  const message = form.message.trim()
  if (!message) {
    errors.message = 'El mensaje es obligatorio.'
  } else if (message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  } else if (message.length > 1000) {
    errors.message = 'El mensaje no puede superar 1000 caracteres.'
  }

  return errors
}

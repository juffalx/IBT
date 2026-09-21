export const AREAS = ['Bole', 'Kazanchis', 'Megenagna', 'Piassa']
export const NOTES_LIMIT = 200

const TELEBIRR = /^(?:\+251|0)9\d{8}$/

export function normalizePhone(phone) {
  return phone.replace(/[\s-]/g, '')
}

export function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'We need a name for the delivery'
  }

  if (!TELEBIRR.test(normalizePhone(form.phone))) {
    errors.phone = 'Use 09… or +2519… (a TeleBirr number has 10 digits)'
  }

  if (!AREAS.includes(form.area)) {
    errors.area = 'Choose a delivery area'
  }

  if (form.notes.length > NOTES_LIMIT) {
    errors.notes = `Notes can be ${NOTES_LIMIT} characters at most`
  }

  return errors
}

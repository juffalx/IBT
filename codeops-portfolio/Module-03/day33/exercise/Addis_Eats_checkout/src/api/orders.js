import { normalizePhone } from '../checkout/validate'

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function placeOrder(form) {
  await wait(1200)

  const phone = normalizePhone(form.phone)

  if (phone.endsWith('0000')) {
    const error = new Error('Some details need fixing')
    error.status = 422
    error.fieldErrors = { phone: 'That number is not registered with TeleBirr' }
    throw error
  }

  if (phone.endsWith('9999')) {
    throw new Error('We could not reach the kitchen. Please try again.')
  }

  return { id: String(Date.now()).slice(-6) }
}

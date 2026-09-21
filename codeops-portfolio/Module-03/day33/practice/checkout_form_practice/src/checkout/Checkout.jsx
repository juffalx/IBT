import { useState } from 'react'
import PropTypes from 'prop-types'
import './checkout.css'
import { placeOrder } from '../api/orders'
import { AREAS, NOTES_LIMIT, validate } from './validate'
import Field from './Field'

const FIELDS = ['name', 'phone', 'area', 'notes']

function Checkout({ total }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: 'Bole',
    notes: '',
  })
  const [touched, setTouched] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const errors = validate(form)
  const show = (field) =>
    touched[field] ? (serverErrors[field] ?? errors[field]) : undefined

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setServerErrors((s) => ({ ...s, [name]: undefined }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
  }

  function focusFirst(fieldErrors) {
    const first = FIELDS.find((field) => fieldErrors[field])
    if (first) document.getElementById(first)?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return

    setServerError('')

    if (Object.keys(errors).length > 0) {
      setTouched({ name: true, phone: true, area: true, notes: true })
      focusFirst(errors)
      return
    }

    setSubmitting(true)

    try {
      const order = await placeOrder(form)
      setOrderId(order.id)
    } catch (err) {
      if (err.status === 422) {
        setServerErrors(err.fieldErrors)
        setTouched((t) => ({ ...t, phone: true }))
        focusFirst(err.fieldErrors)
      } else {
        setServerError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId) {
    return (
      <main className="page">
        <h2>Order placed</h2>
        <p>Your order number is {orderId}.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <h2>Delivery details</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          label="Full name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show('name')}
        />
        <Field
          id="phone"
          label="TeleBirr phone number"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show('phone')}
          hint="For example 0911223344 or +251911223344"
        />
        <Field
          id="area"
          label="Delivery area"
          as="select"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show('area')}
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Field>
        <Field
          id="notes"
          label="Notes for the courier (optional)"
          as="textarea"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show('notes')}
          hint={`${form.notes.length} / ${NOTES_LIMIT}`}
        />

        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Sending your order…' : `Order — ${total} ETB`}
        </button>

        {serverError && (
          <p role="alert" className="form__error">
            <span aria-hidden="true">⚠ </span>
            {serverError}
          </p>
        )}
      </form>
    </main>
  )
}

Checkout.propTypes = {
  total: PropTypes.number.isRequired,
}

export default Checkout

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './checkout.css'
import { useAuth } from '../auth/useAuth'
import { useCartStore, selectTotal } from '../cart/cartStore'
import { placeOrder } from '../api/orders'
import { formatEtb } from '../utils/formatEtb'
import { AREAS, NOTES_LIMIT, validate } from './validate'
import Field from './Field'

const FIELDS = ['name', 'phone', 'area', 'notes']

function markTouched(fieldErrors) {
  return Object.fromEntries(Object.keys(fieldErrors).map((field) => [field, true]))
}

function Checkout() {
  const { user } = useAuth()
  const count = useCartStore((s) => s.items.length)
  const total = useCartStore(selectTotal)
  const clear = useCartStore((s) => s.clear)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: user?.phone ?? '',
    area: 'Bole',
    notes: '',
  })
  const [touched, setTouched] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const clientErrors = validate(form)
  const show = (field) =>
    touched[field] ? (serverErrors[field] ?? clientErrors[field]) : undefined

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

    if (Object.keys(clientErrors).length > 0) {
      setTouched({ name: true, phone: true, area: true, notes: true })
      focusFirst(clientErrors)
      return
    }

    setSubmitting(true)

    try {
      const order = await placeOrder(form)
      navigate(`/orders/${order.id}`, { replace: true, state: { total } })
      clear()
    } catch (err) {
      if (err.status === 422) {
        setServerErrors(err.fieldErrors)
        setTouched((t) => ({ ...t, ...markTouched(err.fieldErrors) }))
        focusFirst(err.fieldErrors)
      } else {
        setServerError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (count === 0) {
    return (
      <main className="page">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="button">
          Back to the menu
        </Link>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <h2>Delivery details</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          label="Full name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={show('name')}
          autoComplete="name"
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
          autoComplete="tel"
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
          {submitting ? 'Sending your order…' : `Order — ${formatEtb(total)}`}
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

export default Checkout

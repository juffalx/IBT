import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { useCartStore, selectTotal } from '../../cart/cartStore'
import { formatEtb } from '../../utils/formatEtb'

function CheckoutPage() {
  const { user } = useAuth()
  const count = useCartStore((s) => s.items.length)
  const total = useCartStore(selectTotal)
  const clear = useCartStore((s) => s.clear)
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

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

  function placeOrder(event) {
    event.preventDefault()
    clear()
    navigate('/menu', { replace: true })
  }

  return (
    <main className="page page--narrow">
      <h2>Delivery details</h2>
      <form className="form" onSubmit={placeOrder}>
        <p>Phone: {user.phone}</p>
        <label className="form__field">
          Delivery address
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </label>
        <p>Total: {formatEtb(total)}</p>
        <button type="submit" className="button">
          Place order
        </button>
      </form>
    </main>
  )
}

export default CheckoutPage

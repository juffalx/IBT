import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

function Checkout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  function placeOrder(event) {
    event.preventDefault()
    navigate('/menu', { replace: true })
  }

  return (
    <main className="page">
      <h1>Checkout</h1>
      <form className="form" onSubmit={placeOrder}>
        <p>Phone: {user.phone}</p>
        <input placeholder="Delivery address" required />
        <button>Place order</button>
      </form>
    </main>
  )
}

export default Checkout

import { Link } from 'react-router-dom'
import Checkout from '../../components/Checkout/Checkout'
import { useCart } from '../../hooks/useCart'

function CartPage() {
  const { items } = useCart()

  return (
    <main className="page page--narrow">
      <Checkout />
      {items.length > 0 && (
        <Link to="/checkout" className="button">
          Go to checkout
        </Link>
      )}
    </main>
  )
}

export default CartPage

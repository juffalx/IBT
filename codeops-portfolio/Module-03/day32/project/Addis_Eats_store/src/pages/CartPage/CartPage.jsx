import { Link } from 'react-router-dom'
import Checkout from '../../components/Checkout/Checkout'
import { useCartStore } from '../../cart/cartStore'

function CartPage() {
  const count = useCartStore((s) => s.items.length)

  return (
    <main className="page page--narrow">
      <Checkout />
      {count > 0 && (
        <Link to="/checkout" className="button">
          Go to checkout
        </Link>
      )}
    </main>
  )
}

export default CartPage

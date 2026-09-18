import './CartBadge.css'
import { useCart } from '../../hooks/useCart'

function CartBadge() {
  const { items } = useCart()
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="cart-badge" role="status" aria-live="polite">
      <span className="cart-badge__label">Cart</span>
      <span className="cart-badge__count" aria-label={`${count} items in cart`}>
        {count}
      </span>
    </div>
  )
}

export default CartBadge

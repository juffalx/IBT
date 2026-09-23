import './CartBadge.css'
import { useCartStore, selectCount } from '../../cart/cartStore'

function CartBadge() {
  const count = useCartStore(selectCount)

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

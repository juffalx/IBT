import './Checkout.css'
import { useCartStore, selectTotal } from '../../cart/cartStore'
import { formatEtb } from '../../utils/formatEtb'

function Checkout() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore(selectTotal)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)

  return (
    <aside className="checkout" aria-label="Checkout">
      <h2 className="checkout__title">Your order</h2>

      {items.length === 0 ? (
        <p className="checkout__empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="checkout__list">
            {items.map((item) => (
              <li key={item.id} className="checkout__row">
                <span className="checkout__name">
                  {item.name} × {item.qty}
                </span>
                <span className="checkout__price">
                  {formatEtb(item.price * item.qty)}
                </span>
                <button
                  type="button"
                  className="checkout__remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => remove(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <p className="checkout__total">
            <span>Total</span>
            <strong>{formatEtb(total)}</strong>
          </p>

          <button
            type="button"
            className="checkout__clear"
            onClick={() => clear()}
          >
            Clear cart
          </button>
        </>
      )}
    </aside>
  )
}

export default Checkout

import './Checkout.css'
import { useCart } from '../../hooks/useCart'
import { formatEtb } from '../../utils/formatEtb'

function Checkout() {
  const { items, total, dispatch } = useCart()

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
                  onClick={() => dispatch({ type: 'remove', id: item.id })}
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
            onClick={() => dispatch({ type: 'clear' })}
          >
            Clear cart
          </button>
        </>
      )}
    </aside>
  )
}

export default Checkout

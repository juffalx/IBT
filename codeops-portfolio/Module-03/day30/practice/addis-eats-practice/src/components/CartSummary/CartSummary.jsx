import PropTypes from 'prop-types'
import './CartSummary.css'
import { formatEtb } from '../../utils/formatEtb'

function CartSummary({ items, total, count, onRemove, onClear }) {
  return (
    <div className="cart-summary">
      <p className="cart-summary__totals">
        {count} item{count === 1 ? '' : 's'} - <strong>{formatEtb(total)}</strong>
      </p>
      {items.length === 0 ? (
        <p className="cart-summary__empty">The cart is empty.</p>
      ) : (
        <ul className="cart-summary__list">
          {items.map((item) => (
            <li key={item.id} className="cart-summary__row">
              <span>
                {item.name} × {item.qty}
              </span>
              <button
                type="button"
                className="cart-summary__remove"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="cart-summary__clear"
        onClick={onClear}
        disabled={items.length === 0}
      >
        Clear
      </button>
    </div>
  )
}

CartSummary.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default CartSummary

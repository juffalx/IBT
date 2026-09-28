import './CartPanel.css'
import { useCart } from '../../hooks/useCart'
import CartSummary from '../CartSummary/CartSummary'

function CartPanel() {
  const { items, total, dispatch } = useCart()
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <section className="cart-panel">
      <h3 className="cart-panel__title">CartPanel reads the cart from context</h3>
      <CartSummary
        items={items}
        total={total}
        count={count}
        onRemove={(id) => dispatch({ type: 'remove', id })}
        onClear={() => dispatch({ type: 'clear' })}
      />
    </section>
  )
}

export default CartPanel

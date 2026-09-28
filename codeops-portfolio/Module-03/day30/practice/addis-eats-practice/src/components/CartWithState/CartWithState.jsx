import { useState } from 'react'
import PropTypes from 'prop-types'
import './CartWithState.css'
import DishPicker from '../DishPicker/DishPicker'
import CartSummary from '../CartSummary/CartSummary'

function CartWithState({ dishes }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)

  function addDish(dish) {
    const existing = items.find((item) => item.id === dish.id)

    setItems(
      existing
        ? items.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...items, { ...dish, qty: 1 }],
    )
    setTotal(total + dish.price)
    setCount(count + 1)
  }

  function removeDish(id) {
    const line = items.find((item) => item.id === id)
    if (!line) return

    setItems(items.filter((item) => item.id !== id))
    setTotal(total - line.price * line.qty)
    setCount(count - line.qty)
  }

  function clearCart() {
    setItems([])
    setTotal(0)
    setCount(0)
  }

  return (
    <section className="cart-with-state">
      <h3 className="cart-with-state__title">Three useState calls</h3>
      <DishPicker dishes={dishes} onPick={addDish} />
      <CartSummary
        items={items}
        total={total}
        count={count}
        onRemove={removeDish}
        onClear={clearCart}
      />
    </section>
  )
}

CartWithState.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CartWithState

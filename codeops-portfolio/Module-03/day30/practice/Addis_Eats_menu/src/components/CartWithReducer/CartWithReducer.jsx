import { useReducer } from 'react'
import PropTypes from 'prop-types'
import './CartWithReducer.css'
import { cartReducer, initialCartState } from '../../reducers/cartReducer'
import DishPicker from '../DishPicker/DishPicker'
import CartSummary from '../CartSummary/CartSummary'

function CartWithReducer({ dishes }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  )
  const count = state.items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <section className="cart-with-reducer">
      <h3 className="cart-with-reducer__title">One useReducer call</h3>
      <DishPicker
        dishes={dishes}
        onPick={(dish) => dispatch({ type: 'add', dish })}
      />
      <CartSummary
        items={state.items}
        total={total}
        count={count}
        onRemove={(id) => dispatch({ type: 'remove', id })}
        onClear={() => dispatch({ type: 'clear' })}
      />
    </section>
  )
}

CartWithReducer.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CartWithReducer

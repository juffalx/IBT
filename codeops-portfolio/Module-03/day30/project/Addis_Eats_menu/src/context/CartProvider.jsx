import { useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './CartContext'
import { cartReducer, initialCartState } from '../reducers/cartReducer'

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  )

  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CartProvider

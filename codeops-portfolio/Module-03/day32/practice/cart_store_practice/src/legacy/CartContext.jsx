import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { items: [...state.items, action.dish] }
    case 'remove':
      return { items: state.items.filter((item) => item.id !== action.id) }
    case 'clear':
      return { items: [] }
    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const value = useMemo(() => ({ items: state.items, dispatch }), [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)

  if (ctx === null) {
    throw new Error('useCart must be used inside a CartProvider')
  }

  return ctx
}

import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function useCart() {
  const cart = useContext(CartContext)

  if (cart === null) {
    throw new Error('useCart must be used inside a CartProvider')
  }

  return cart
}

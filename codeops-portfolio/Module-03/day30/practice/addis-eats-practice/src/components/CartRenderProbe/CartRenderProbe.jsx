import { memo } from 'react'
import './CartRenderProbe.css'
import { useCart } from '../../hooks/useCart'
import RenderCounter from '../RenderCounter/RenderCounter'

function CartRenderProbe() {
  const { items } = useCart()

  return (
    <section className="cart-render-probe">
      <h3 className="cart-render-probe__title">Context consumer</h3>
      <p className="cart-render-probe__lines">
        Cart lines: {items.length}
      </p>
      <RenderCounter label="Consumer renders" />
    </section>
  )
}

export default memo(CartRenderProbe)

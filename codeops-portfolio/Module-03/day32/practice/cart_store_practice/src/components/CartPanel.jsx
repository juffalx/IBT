import { useCartStore } from '../cart/cartStore'

function CartPanel() {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <aside className="panel">
      <h2>Your order</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.map((item, index) => (
        <div key={index} className="row">
          <span>
            {item.name} - {item.price} ETB
          </span>
          <button onClick={() => remove(item.id)}>x</button>
        </div>
      ))}
      <p>Total: {total} ETB</p>
      {items.length > 0 && <button onClick={clear}>Clear cart</button>}
    </aside>
  )
}

export default CartPanel

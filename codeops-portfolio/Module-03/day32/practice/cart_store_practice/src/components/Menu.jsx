import { dishes } from '../data/dishes'
import { useCartStore } from '../cart/cartStore'

function Menu() {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <ul className="dishes">
      {dishes.map((dish) => (
        <li key={dish.id} className="card">
          <span>
            {dish.name} - {dish.price} ETB
          </span>
          <button onClick={() => addItem(dish)}>Add</button>
        </li>
      ))}
    </ul>
  )
}

export default Menu

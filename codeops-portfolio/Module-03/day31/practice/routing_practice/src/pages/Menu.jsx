import { Link, useSearchParams } from 'react-router-dom'
import { dishes, categories } from '../data/dishes'

function Menu() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'All'

  const shown =
    category === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === category)

  return (
    <main className="page">
      <h1>Menu</h1>
      <div className="filters">
        {categories.map((name) => (
          <button
            key={name}
            className={name === category ? 'on' : ''}
            onClick={() => setParams({ category: name })}
          >
            {name}
          </button>
        ))}
      </div>
      <ul className="dishes">
        {shown.map((dish) => (
          <li key={dish.id}>
            <Link to={`/menu/${dish.id}`}>{dish.name}</Link> - {dish.price} ETB
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Menu

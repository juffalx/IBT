import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './Menu.css'
import { useFetch } from '../../hooks/useFetch'
import { useCartStore } from '../../cart/cartStore'
import { SORT_OPTIONS, sortDishes } from '../../utils/sortDishes'
import DishList from '../DishList/DishList'
import Spinner from '../Spinner/Spinner'
import ErrorNote from '../ErrorNote/ErrorNote'

function Menu({ category, simulateError }) {
  const [sortOrder, setSortOrder] = useState('default')

  const params = new URLSearchParams({ c: category })
  if (simulateError) params.set('fail', '1')

  const { data, loading, error } = useFetch(`/api/dishes?${params}`)
  const addItem = useCartStore((s) => s.addItem)

  const shown = useMemo(
    () => sortDishes(data ?? [], sortOrder),
    [data, sortOrder],
  )

  let content

  if (loading) {
    content = <Spinner />
  } else if (error) {
    content = <ErrorNote message={error} />
  } else if (shown.length === 0) {
    content = <p className="menu__empty">No dishes found for {category}.</p>
  } else {
    content = <DishList dishes={shown} onAdd={addItem} />
  }

  return (
    <section className="menu" aria-label="Menu">
      <div className="menu__toolbar">
        <h2 className="menu__title">{category} dishes</h2>
        <label className="menu__sort">
          Sort by
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {content}
    </section>
  )
}

Menu.propTypes = {
  category: PropTypes.string.isRequired,
  simulateError: PropTypes.bool,
}

export default Menu

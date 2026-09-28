import './DishNames.css'
import { useFetch } from '../../hooks/useFetch'
import Spinner from '../Spinner/Spinner'
import ErrorNote from '../ErrorNote/ErrorNote'

function DishNames() {
  const { data, loading, error } = useFetch('/dishes.json')

  return (
    <section className="dish-names">
      <h3 className="dish-names__title">DishNames</h3>
      {loading && <Spinner />}
      {error && <ErrorNote message={error} />}
      {!loading && data && (
        <ul className="dish-names__list">
          {data.map((dish) => (
            <li key={dish.id}>{dish.name}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default DishNames

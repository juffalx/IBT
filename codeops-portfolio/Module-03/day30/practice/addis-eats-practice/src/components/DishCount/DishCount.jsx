import './DishCount.css'
import { useFetch } from '../../hooks/useFetch'
import Spinner from '../Spinner/Spinner'
import ErrorNote from '../ErrorNote/ErrorNote'

function DishCount() {
  const { data, loading, error } = useFetch('/dishes.json')

  return (
    <section className="dish-count">
      <h3 className="dish-count__title">DishCount</h3>
      {loading && <Spinner />}
      {error && <ErrorNote message={error} />}
      {!loading && data && <p>{data.length} dishes on the menu</p>}
    </section>
  )
}

export default DishCount

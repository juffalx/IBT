import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { formatEtb } from '../../utils/formatEtb'
import Spinner from '../../components/Spinner/Spinner'
import ErrorNote from '../../components/ErrorNote/ErrorNote'

function HomePage() {
  const { data, loading, error } = useFetch('/api/dishes')

  let specials

  if (loading) {
    specials = <Spinner />
  } else if (error) {
    specials = <ErrorNote message={error} />
  } else {
    specials = (
      <ul className="specials">
        {data.slice(0, 3).map((dish) => (
          <li key={dish.id} className="specials__item">
            <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
            <span>{formatEtb(dish.price)}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <main className="page">
      <h2>Welcome to Addis Eats</h2>
      <p>Today's specials</p>
      {specials}
      <Link to="/menu" className="button">
        See the full menu
      </Link>
    </main>
  )
}

export default HomePage

import { Link, useParams } from 'react-router-dom'
import { useFetch } from './hooks/useFetch'
import { formatEtb } from './utils/formatEtb'
import Spinner from './components/Spinner/Spinner'
import ErrorNote from './components/ErrorNote/ErrorNote'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function DishDetail() {
  const { id } = useParams()
  const { data: dish, loading, error } = useFetch(`/api/dishes/${id}`)

  if (loading) return <Spinner />
  if (error?.includes('404')) {
    return <NotFoundPage message={`No dish called ${id}`} />
  }
  if (error) return <ErrorNote message={error} />
  if (!dish) return <NotFoundPage message={`No dish called ${id}`} />

  return (
    <main className="page dish-detail">
      <Link to="/menu" className="dish-detail__back">
        Back to menu
      </Link>
      <h2 className="dish-detail__name">{dish.name}</h2>
      <p className="dish-detail__meta">
        {dish.category}
        {dish.spicy && ' · Spicy'}
      </p>
      <p className="dish-detail__price">{formatEtb(dish.price)}</p>
    </main>
  )
}

export default DishDetail

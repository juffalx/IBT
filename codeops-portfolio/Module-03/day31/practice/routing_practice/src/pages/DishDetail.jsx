import { Link, useParams } from 'react-router-dom'
import { dishes } from '../data/dishes'
import NotFound from './NotFound'

function DishDetail() {
  const { id } = useParams()
  const dish = dishes.find((item) => item.id === id)

  if (!dish) return <NotFound message={`No dish called ${id}`} />

  return (
    <main className="page">
      <Link to="/menu">Back to menu</Link>
      <h1>{dish.name}</h1>
      <p>{dish.category}</p>
      <p>{dish.price} ETB</p>
    </main>
  )
}

export default DishDetail

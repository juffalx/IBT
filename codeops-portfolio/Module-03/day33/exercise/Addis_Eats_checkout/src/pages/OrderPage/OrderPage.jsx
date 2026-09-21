import { Link, useLocation, useParams } from 'react-router-dom'
import { formatEtb } from '../../utils/formatEtb'

function OrderPage() {
  const { id } = useParams()
  const location = useLocation()
  const total = location.state?.total

  return (
    <main className="page">
      <h2>Order placed</h2>
      <p>Your order number is {id}.</p>
      {total !== undefined && <p>Total: {formatEtb(total)}</p>}
      <Link to="/menu" className="button">
        Back to the menu
      </Link>
    </main>
  )
}

export default OrderPage

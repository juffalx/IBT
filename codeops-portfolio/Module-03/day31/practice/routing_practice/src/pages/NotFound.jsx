import { Link } from 'react-router-dom'

function NotFound({ message = 'That page does not exist.' }) {
  return (
    <main className="page">
      <h1>Not found</h1>
      <p>{message}</p>
      <Link to="/menu">Back to the menu</Link>
    </main>
  )
}

export default NotFound

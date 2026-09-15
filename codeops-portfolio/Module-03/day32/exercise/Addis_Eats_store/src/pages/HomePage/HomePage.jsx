import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="page">
      <h2>Welcome to Addis Eats</h2>
      <p>Ethiopian favourites, delivered to your door.</p>
      <Link to="/menu" className="button">
        See the menu
      </Link>
    </main>
  )
}

export default HomePage

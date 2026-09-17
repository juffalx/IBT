import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="page">
      <h1>Addis Eats</h1>
      <Link to="/menu">See the menu</Link>
    </main>
  )
}

export default Home

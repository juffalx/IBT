import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function NotFoundPage({ message = 'That page does not exist.' }) {
  return (
    <main className="page">
      <h2>Not found</h2>
      <p>{message}</p>
      <Link to="/menu" className="button">
        Back to the menu
      </Link>
    </main>
  )
}

NotFoundPage.propTypes = {
  message: PropTypes.string,
}

export default NotFoundPage

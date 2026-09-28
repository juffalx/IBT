import PropTypes from 'prop-types'
import './ErrorNote.css'

function ErrorNote({ message }) {
  return (
    <div className="error-note" role="alert">
      <strong className="error-note__title">Could not load the menu</strong>
      <span className="error-note__message">{message}</span>
    </div>
  )
}

ErrorNote.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorNote

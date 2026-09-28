import './Spinner.css'

function Spinner() {
  return (
    <div className="spinner" role="status">
      <span className="spinner__ring" aria-hidden="true"></span>
      <span className="spinner__text">Loading menu...</span>
    </div>
  )
}

export default Spinner

import PropTypes from 'prop-types'
import './ExerciseHeader.css'

function ExerciseHeader({ number, title, goal }) {
  return (
    <header className="exercise-header">
      <span className="exercise-header__badge">Exercise {number}</span>
      <h2 className="exercise-header__title">{title}</h2>
      <p className="exercise-header__goal">{goal}</p>
    </header>
  )
}

ExerciseHeader.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
}

export default ExerciseHeader

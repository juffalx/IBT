import PropTypes from 'prop-types'
import './ExerciseNav.css'

function ExerciseNav({ exercises, activeId, onSelect }) {
  return (
    <nav className="exercise-nav" aria-label="Exercises">
      {exercises.map((exercise) => (
        <button
          key={exercise.id}
          type="button"
          className={
            exercise.id === activeId
              ? 'exercise-nav__button exercise-nav__button--active'
              : 'exercise-nav__button'
          }
          aria-current={exercise.id === activeId ? 'page' : undefined}
          onClick={() => onSelect(exercise.id)}
        >
          {exercise.id}. {exercise.label}
        </button>
      ))}
    </nav>
  )
}

ExerciseNav.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default ExerciseNav

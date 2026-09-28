import PropTypes from 'prop-types'
import './DishPicker.css'
import { formatEtb } from '../../utils/formatEtb'

function DishPicker({ dishes, onPick }) {
  return (
    <div className="dish-picker">
      {dishes.map((dish) => (
        <button
          key={dish.id}
          type="button"
          className="dish-picker__button"
          onClick={() => onPick(dish)}
        >
          Add {dish.name} ({formatEtb(dish.price)})
        </button>
      ))}
    </div>
  )
}

DishPicker.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPick: PropTypes.func.isRequired,
}

export default DishPicker

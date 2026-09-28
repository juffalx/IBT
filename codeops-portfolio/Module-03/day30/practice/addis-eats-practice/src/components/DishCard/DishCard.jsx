import PropTypes from 'prop-types'
import './DishCard.css'
import { formatEtb } from '../../utils/formatEtb'

function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <h3 className="dish-card__name">{dish.name}</h3>
      <p className="dish-card__price">{formatEtb(dish.price)}</p>
      {dish.spicy && <span className="dish-card__spicy">Spicy</span>}
      <button
        type="button"
        className="dish-card__add"
        onClick={() => onAdd(dish)}
      >
        Add to cart
      </button>
    </article>
  )
}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default DishCard

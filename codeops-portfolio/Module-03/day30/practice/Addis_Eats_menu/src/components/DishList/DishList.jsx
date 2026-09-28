import PropTypes from 'prop-types'
import './DishList.css'
import DishCard from '../DishCard/DishCard'
import RenderCounter from '../RenderCounter/RenderCounter'

function DishList({ dishes, onAdd }) {
  return (
    <div className="dish-list">
      <RenderCounter label="DishList renders" />
      <div className="dish-list__grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default DishList

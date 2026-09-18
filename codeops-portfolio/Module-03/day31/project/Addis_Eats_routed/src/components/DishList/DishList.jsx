import { memo } from 'react'
import PropTypes from 'prop-types'
import './DishList.css'
import DishCard from '../DishCard/DishCard'

function DishList({ dishes, onAdd }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  )
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default memo(DishList)

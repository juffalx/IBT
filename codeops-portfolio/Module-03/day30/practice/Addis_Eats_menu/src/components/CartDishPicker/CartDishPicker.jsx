import PropTypes from 'prop-types'
import { useCart } from '../../hooks/useCart'
import DishPicker from '../DishPicker/DishPicker'

function CartDishPicker({ dishes }) {
  const { dispatch } = useCart()

  return (
    <DishPicker
      dishes={dishes}
      onPick={(dish) => dispatch({ type: 'add', dish })}
    />
  )
}

CartDishPicker.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CartDishPicker

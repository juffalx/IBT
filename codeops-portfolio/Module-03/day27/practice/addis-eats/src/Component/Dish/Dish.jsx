// TODO: 1. Add PropTypes to Dish (name and price required, spicy optional) and a currency default of "ETB".
// TODo; 2. Render a "Spicy" badge conditionally with && — guard any non-boolean so you never render a 0.

import PropTypes from "prop-types";
import Card from './Card'

function Dish({id, name, price, spicy, currency="ETB" }) {
  return (
    <Card>
        <div id={id}>
            <h3>{name}</h3>
            <p>{price} {currency}</p>
            {Boolean(spicy) && <p>Spicy</p>}
        </div>
    </Card>
  )
}

Dish.PropTypes = {
    name:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    spicy:PropTypes.bool
}

export default Dish;


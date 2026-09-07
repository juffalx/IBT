import PropTypes from "prop-types";
import Card from './Card'
import './Dish.css'
import { useState } from 'react'

function Dish({ id, name, price, spicy, currency = "ETB", onAdd }) {
    const [count, setCount] = useState(0)

    function handleAdd() {

        setCount(c => c + 1)

        if (onAdd) onAdd(price)
    }

    return (
        <Card id={id}>
            <div className='card-title'>
                <h3>{name}</h3>
            </div>
            <p>{price} {currency}</p>
            {Boolean(spicy) && <p><span className="spicy"> Spicy</span></p>}
            <button onClick={handleAdd}>Add</button>
            {Boolean(count) && <p>In cart: {count}</p>}
        </Card>
    )
}

Dish.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    currency: PropTypes.string,
    onAdd: PropTypes.func,
};

export default Dish

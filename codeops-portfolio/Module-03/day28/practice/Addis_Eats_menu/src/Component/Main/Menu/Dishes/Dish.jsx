import PropTypes from "prop-types";
import Card from './Card'
import './Dish.css'
import { useState } from "react";

function Dish({ id, name, price, spicy, currency = "ETB", countBtn }) {
    const [count, setCount] = useState(0)

    function handleclick(){
        setCount(oldValue => oldValue + 1)

        if(countBtn) { countBtn(price) }
    }
    return (
        <Card id={id}>
            <div className='card-title'>
                <h3>{name}</h3>
            </div>
            <p>{price} {currency}</p>
            {Boolean(spicy) && <p><span className="spicy"> Spicy</span></p>}
            <button onClick={handleclick} >Add</button>
            {Boolean(count) && <p>{count}</p>}
        </Card>
    )
}

Dish.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    currency: PropTypes.string,
};

export default Dish

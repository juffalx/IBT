import PropTypes from "prop-types";
import Card from './Card'
import './Dish.css'

function Dish({ id, name, price, spicy, currency = "ETB" }) {
    return (
        <Card id={id}>
            <div className='card-title'>
                <h3>{name}</h3>
            </div>
            <p>{price} {currency}</p>
            {Boolean(spicy) && <p><span className="spicy"> Spicy</span></p>}
            <button>Add</button>
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

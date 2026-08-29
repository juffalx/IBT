import PropTypes from 'prop-types'
import './Header.css'

function Header({ cartCount, orderTotal }) {
    return (
        <div className='main-heading'>
            <h1 className='heading-title'>Habesha Eater</h1>

            {cartCount >= 0 && (
                <div className="cart-summary">
                    <span>Cart: {cartCount} item{cartCount > 1 ? 's' : ''}</span>
                    <span className="order-total">{orderTotal} ETB</span>
                </div>
            )}
        </div>
    )
}

Header.propTypes = {
    cartCount: PropTypes.number.isRequired,
    orderTotal: PropTypes.number.isRequired,
}

export default Header

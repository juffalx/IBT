import PropTypes from 'prop-types';
import './Header.css';
import { useRef, useEffect, useState } from 'react';

function Header({ cartCount, orderTotal }) {
  const serachRef = useRef(null);
  const [userSearch, setUserSearch] = useState('')


  function handleSearch(event){
    setUserSearch(event.target.value)
  }
  useEffect(() => {
    serachRef.current.focus();
  }, []);

  return (
    <div className="main-heading">
      <h1 className="heading-title">Habesha Eater</h1>
      {/*  */}
      <div className="search-cls">
        <input ref={serachRef} 
        type="text"  
        placeholder='Search Dish ...' 
        value={userSearch}
        onChange={handleSearch}>
        
        </input>
      </div>

      {cartCount >= 0 && (
        <div className="cart-summary">
          <span>
            Cart: {cartCount} item{cartCount > 1 ? 's' : ''}
          </span>
          <span className="order-total">{orderTotal} ETB</span>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
};

export default Header;

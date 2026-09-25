import PropTypes from 'prop-types';
import './Header.css';
import {
  useRef,
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo,
} from 'react';

import { searchChannel } from '../../App';
import { ThemeChannel } from '../../Context/ThemeContext';
function Header({ cartCount, orderTotal }) {
  const { query, setQuery } = useContext(searchChannel);
  const { theme, togletheme, setTheme } = useContext(ThemeChannel);

  const searchRef = useRef(null);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // useEffect(() => console.log(query), [query]);
  useEffect(() => console.log('types of toglehtme is ', typeof togletheme), []);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="main-heading">
      <div className="themeButton"></div>
      <h1 className="heading-title">Habesha Eater</h1>
      {/*  */}
      <div className="search-cls">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search Dish ..."
          value={query}
          onChange={handleSearch}
        ></input>
      </div>

      {cartCount >= 0 && (
        <div className="cart-summary">
          <span>
            Cart: {cartCount} item{cartCount > 1 ? 's' : ''}
          </span>
          <span className="order-total">{orderTotal} ETB</span>
        </div>
      )}
      <div>
        <button className="btn-theme" onClick={() => setTheme(togletheme) }>
          {theme === 'light' ? 'Light' : 'Black'}
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
};

export default Header;

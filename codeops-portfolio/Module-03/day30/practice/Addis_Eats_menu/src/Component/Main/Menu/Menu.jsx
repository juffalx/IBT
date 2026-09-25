import './Menu.css';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dish from './Dishes/Dish';
import CategoryBar from './CategoryBar/CategoryBar';
import OrderForm from './OrderForm/OrderForm';
import { categories } from './data';
import { searchChannel } from '../../../App';
import { useFetch } from '../../../Fetch/FetchData';

const API = 'data.json';

function Products({ onAdd }) {
  const { dishes, loading, error } = useFetch(API);
  const { query } = useContext(searchChannel);
  const [category, setCategory] = useState('All');
  const filteredDishes = dishes.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesQuery = item.name
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase().trim());
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    document.title = `Total ${filteredDishes.length} Dishes`;
  }, [filteredDishes.length]);

  // useEffect(() => console.log('dishe is ', loading), []);
  if (loading) return <p>Loading Data</p>;
  if (error) return <p>Error happen {error}</p>;
  return (
    <div className="dish-grid">
      <h3 className="menu">Products Menu</h3>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <div className="item">
        {filteredDishes.length === 0 ? (
          <p className="empty-state">No dishes found matching your criteria.</p>
        ) : (
          filteredDishes.map((value) => (
            <Dish
              key={value.id}
              id={value.id}
              name={value.name}
              price={value.price}
              spicy={value.spicy}
              onAdd={onAdd}
            />
          ))
        )}
      </div>

      <OrderForm />
    </div>
  );
}

Products.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Products;

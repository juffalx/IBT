import './Menu.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dish from './Dishes/Dish';
import CategoryBar from './CategoryBar/CategoryBar';
import OrderForm from './OrderForm/OrderForm';
import { categories } from './data';

const API = './../../../../public/data.json';

function Products({ onAdd }) {
  const [category, setCategory] = useState('All');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const ctrl = new AbortController();

    async function loadData() {
      try {
        const res = await fetch(API);
        if (!res) {
          throw new Error('Http Error', res.status);
        }

        setDishes(await res.json());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    return ctrl.abort();
  }, [category]);

  useEffect(() => {
    categories === 'All'
      ? (document.title = `Total ${dishes.length} Dishes`)
      : (document.title = `Total ${filteredDishes.length} Dishes`);
  }, [category]);

  const filteredDishes =
    category === 'All'
      ? dishes
      : dishes.filter((item) => item.category === category);

  if (loading) return <p>Loading Data</p>;
  if (error) return <p>Error happen {error}</p>;
  if (filteredDishes.length === 0) {
    return <p>not Found Dish of {category}</p>;
  }
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
          <p className="empty-state">No dishes found for "{category}".</p>
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

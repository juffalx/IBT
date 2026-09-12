import './Menu.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dish from './Dishes/Dish';
import CategoryBar from './CategoryBar/CategoryBar';
import OrderForm from './OrderForm/OrderForm';
import { categories } from './data';
import LoadingAnimation from './LoadingAnimation';

const API = './data.json';

function Products({ onAdd }) {
  const [category, setCategory] = useState('All');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errormsg, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function loadData() {
      try {
        const res = await fetch(API, {
          signal: ctrl.signal,
        });

        if (!res.ok) {
          throw new Error(`Http Error: ${res.status}`);
        }

        const data = await res.json();

        setTimeout(() => {
          if (!ctrl.signal.aborted) {
            setDishes(data);
            setLoading(false);
            console.log("run once b/c of abored condition")
          }
        }, 2000);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ctrl.abort();
    };
  }, []);

  const filteredDishes =
    category === 'All'
      ? dishes
      : dishes.filter((item) => item.category === category);

  useEffect(() => {
    if (category === 'All') {
      document.title = `Total ${dishes.length} Dishes`;
    } else {
      document.title = `Total ${filteredDishes.length} Dishes`;
    }
  }, [category, dishes]);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (errormsg) {
    return <p>Couldn't load Dishes</p>;
  }

  if (filteredDishes.length === 0) {
    return <p>Not Found Dish of {category}</p>;
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
        {filteredDishes.map((value) => (
          <Dish
            key={value.id}
            id={value.id}
            name={value.name}
            price={value.price}
            spicy={value.spicy}
            onAdd={onAdd}
          />
        ))}
      </div>

      <OrderForm />
    </div>
  );
}

Products.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Products;

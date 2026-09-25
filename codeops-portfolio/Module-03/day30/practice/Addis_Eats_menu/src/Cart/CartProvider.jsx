import { useEffect, useReducer } from 'react';
import { CartReducer } from './CartReducer';

const CartProvider = () => {
  const [state, dispatch] = useReducer(CartReducer, {
    item: [{ id: 10, name: 'test' }],
  });

  useEffect(() => {
    dispatch({ type: 'add', item: { id: 1, name: 'kitfo' } });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <div>CartProvider</div>;
};

export default CartProvider;
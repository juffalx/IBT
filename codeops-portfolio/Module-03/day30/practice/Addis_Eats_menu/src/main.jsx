import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App'
import CartProvider from './Cart/CartProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    <CartProvider />
  </StrictMode>
);

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Navbar } from './Component/Navbar';
import { DishList } from './Component/DishList';
import { CheckoutForm } from './Component/CheckoutForm';
import { useCartStore } from './store/useCartStore';
import { useAuthStore } from './store/useAuthStore';
// Simple Cart View Component
const CartView = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <div className="empty-state">Your cart is empty.</div>;
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>
            {item.name} (x{item.quantity})
          </span>
          <span>{item.price * item.quantity} ETB</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: {totalPrice} ETB</h3>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
    </div>
  );
};

// Order Success Component
const OrderSuccess = () => (
  <div className="success-state">
    <h2>Order Placed Successfully!</h2>
    <p>Thank you for ordering with Addis Eats. Your food is on the way!</p>
  </div>
);

// Login Component placeholder
const LoginView = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: 'Test User', email: 'user@addiseats.com' });
    navigate('/');
  };

  return (
    <div className="login-view">
      <h2>Login to Addis Eats</h2>
      <button onClick={handleLogin}>Simulate Login</button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DishList />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<LoginView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

import './App.css';
import { useEffect, useState, createContext, useMemo, useContext } from 'react';
import Header from './Component/Header/Header';
import Midle from './Component/Main/Midle';
import Footer from './Component/Footer/Footer';
export const searchChannel = createContext(null);
import ThemeContext from './Context/ThemeContext';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [query, setQuery] = useState('');
  const searchProviderValue = useMemo(() => ({ query, setQuery }), [query]);

  // useEffect(() => console.log('theme is in app.jsx', theme), []);

  function handleAdd(price) {
    setOrderTotal((total) => total + price);
    setCartCount((c) => c + 1);
  }

  return (
    <div className="containers" id="test" style={{ backgrond: 'red' }}>
      <ThemeContext>
        <searchChannel.Provider value={searchProviderValue}>
          <Header cartCount={cartCount} orderTotal={orderTotal} />
          <Midle onAdd={handleAdd} />
          <Footer />
        </searchChannel.Provider>
      </ThemeContext>
    </div>
  );
}

export default App;

import './App.css'
import CartProvider from './context/CartProvider'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MenuPage from './pages/MenuPage/MenuPage'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <MenuPage />
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App

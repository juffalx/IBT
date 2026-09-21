import './App.css'
import './routes.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeProvider from './theme/ThemeProvider'
import './theme/theme.css'
import AuthProvider from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import Layout from './Layout'
import HomePage from './pages/HomePage/HomePage'
import MenuPage from './pages/MenuPage/MenuPage'
import DishDetail from './DishDetail'
import CartPage from './pages/CartPage/CartPage'
import Checkout from './checkout/Checkout'
import OrderPage from './pages/OrderPage/OrderPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<CartPage />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="orders/:id" element={<OrderPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

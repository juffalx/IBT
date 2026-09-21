import './Header.css'
import { Link } from 'react-router-dom'
import CartBadge from '../CartBadge/CartBadge'
import Navbar from './Navbar'
import { useAuth } from '../../auth/useAuth'
import { useTheme } from '../../theme/useTheme'

function Header() {
  const { user, logout } = useAuth()
  const { mode, toggle } = useTheme()

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <h1 className="header__title">Addis Eats</h1>
      </Link>
      <Navbar />
      <div className="header__side">
        <Link to="/cart" className="header__cart">
          <CartBadge />
        </Link>
        <button type="button" className="header__auth" onClick={toggle}>
          {mode === 'light' ? 'Dark' : 'Light'}
        </button>
        {user ? (
          <button type="button" className="header__auth" onClick={logout}>
            Sign out
          </button>
        ) : (
          <Link to="/login" className="header__auth">
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header

import { useAuth } from '../auth/AuthContext'
import { useTheme } from '../theme/ThemeContext'
import { useCartStore } from '../cart/cartStore'

function CartBadge() {
  const count = useCartStore((s) => s.items.length)

  return <span>Cart: {count}</span>
}

function Header() {
  const { user, login, logout } = useAuth()
  const { mode, toggle } = useTheme()

  return (
    <header className="header">
      <h1>Addis Eats</h1>
      <div className="header__side">
        <CartBadge />
        <button onClick={toggle}>{mode === 'light' ? 'Dark' : 'Light'}</button>
        {user ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <button onClick={() => login('0911223344')}>Sign in</button>
        )}
      </div>
    </header>
  )
}

export default Header

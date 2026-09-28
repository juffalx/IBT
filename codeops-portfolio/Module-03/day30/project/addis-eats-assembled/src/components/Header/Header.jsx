import './Header.css'
import CartBadge from '../CartBadge/CartBadge'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Addis Eats</h1>
      <CartBadge />
    </header>
  )
}

export default Header

import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/checkout', label: 'Checkout' },
]

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar

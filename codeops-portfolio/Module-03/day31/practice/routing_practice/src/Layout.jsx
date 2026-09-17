import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'on' : '')}>
          Home
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => (isActive ? 'on' : '')}>
          Menu
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? 'on' : '')}
        >
          Checkout
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout

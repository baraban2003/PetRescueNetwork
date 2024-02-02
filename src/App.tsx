import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import classNames from "classnames"
import s from "./app.module.css"
import Logo from "./assets/icons/logo.svg?react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(s.navbar, {
    [s.navbar__active]: isActive,
  })

export function App() {
  const location = useLocation()

  return (
    <div>
      <ToastContainer />
      <header className={s.header}>
        <Link to="/">
          <div className={s.logo}>
            <Logo />
          </div>
        </Link>

        <NavLink className={getActiveLinkClass} to="/">
          Home
        </NavLink>

        <NavLink
          className={getActiveLinkClass}
          to={{
            pathname: "pets",
            search: location.search,
          }}
        >
          Pets
        </NavLink>

        <NavLink to="/register" className={getActiveLinkClass}>
          Sign Up
        </NavLink>

        <NavLink to="/login" className={getActiveLinkClass}>
          Sign In
        </NavLink>
      </header>
      <Outlet />
    </div>
  )
}

export default App

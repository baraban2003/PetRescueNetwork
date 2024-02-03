import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import classNames from "classnames"
import s from "./App.module.css"
import Logo from "./assets/icons/logo.svg?react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(s.navbar, {
    [s.navbar__active]: isActive,
  })

const getActiveButton = ({ isActive }: { isActive: boolean }) =>
  classNames(s.authButton, {
    [s.authButton__active]: isActive,
  })

export function App() {
  const location = useLocation()

  return (
    <div>
      <ToastContainer />
      <header className={s.header}>
        <div className={s.logo}>
          <Link to="/" className={s.logoText}>
            Fluffies
            <div className={s.logoIcon}>
              <Logo />
            </div>
          </Link>
        </div>

        <div className={s.navigation}>
          <NavLink className={getActiveLinkClass} to="/helpforfluffies">
            Help for fluffies
          </NavLink>

          <NavLink
            className={getActiveLinkClass}
            to={{
              pathname: "/howtohelp",
              search: location.search,
            }}
          >
            How to help
          </NavLink>
          <NavLink
            className={getActiveLinkClass}
            to={{
              pathname: "/yourkindhearts",
              search: location.search,
            }}
          >
            Your kind hearts
          </NavLink>

          <div className={s.logo}>
            <NavLink to="/login" className={getActiveButton}>
              Log In
            </NavLink>

            <NavLink to="/register" className={getActiveButton}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

export default App

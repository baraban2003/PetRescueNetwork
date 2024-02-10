import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import classNames from "classnames"
import s from "./App.module.css"
import Logo from "./assets/icons/logo.svg?react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(s.navbar, {
    [s.navbar__active]: isActive,
  })

const getActiveButtonLogin = ({ isActive }: { isActive: boolean }) =>
  classNames(s.authButton, s.authButtonLogin, {
    [s.authButtonLogin__active]: isActive,
  })

const getActiveButtonRegister = ({ isActive }: { isActive: boolean }) =>
  classNames(s.authButton, s.authButtonRegister, {
    [s.authButtonRegister__active]: isActive,
  })

export function App() {
  const [navigationVisible, setNavigationVisible] = useState(true)
  const location = useLocation()

  const hideNavigation = () => {
    setNavigationVisible(false)
  }

  const showNavigation = () => {
    if (navigationVisible === true) {
      return
    }

    setNavigationVisible(true)
  }

  return (
    <div>
      <ToastContainer />
      <header
        className={classNames(s.header, {
          [s.headerToRight]: !navigationVisible,
        })}
      >
        <div className={s.logo} onClick={showNavigation}>
          <Link to="/" className={s.logoText}>
            Fluffies
            <div className={s.logoIcon}>
              <Logo />
            </div>
          </Link>
        </div>

        {navigationVisible && (
          <div className={s.navigation}>
            <div className={s.navigationMenu}>
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
            </div>

            <div className={s.auth}>
              <NavLink
                to="/login"
                className={getActiveButtonLogin}
                onClick={hideNavigation}
              >
                Log In
              </NavLink>

              <NavLink
                to="/register"
                className={getActiveButtonRegister}
                onClick={hideNavigation}
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <Outlet />
    </div>
  )
}

export default App

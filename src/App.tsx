import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import classNames from "classnames"
import s from "./App.module.css"
import Logo from "./assets/icons/logo.svg?react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./services/hooks"
import * as navigationVisibleAction from "./redux/navigationVisible/navigationVisibleSlice"
import { AddFluffy } from "./components/AddFluffy"
import AvatarIcon from "./components/AvatarIcon/AvatarIcon"
import authOperations from "./redux/auth/authOperations"

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(s.navbar, {
    [s.navbar__active]: isActive,
  })

export function App() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigationVisible = useAppSelector(
    (state) => state.navigationVisible.navigationVisible,
  )

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const hideNavigation = () => {
    dispatch(navigationVisibleAction.hideNavigation())
    sessionStorage.setItem("navigationVisible", "false")
  }

  const showNavigation = () => {
    dispatch(navigationVisibleAction.showNavigation())
    sessionStorage.setItem("navigationVisible", "true")
  }

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser())
  }, [isLoggedIn])

  useEffect(() => {
    const persistedNavigationVisible =
      sessionStorage.getItem("navigationVisible")
    if (
      persistedNavigationVisible === "true" ||
      persistedNavigationVisible === null ||
      persistedNavigationVisible === undefined
    ) {
      dispatch(navigationVisibleAction.showNavigation())
    } else {
      dispatch(navigationVisibleAction.hideNavigation())
    }

    const handlePopState = () => {
      dispatch(navigationVisibleAction.showNavigation())
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [dispatch])

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

            {isLoggedIn ? (
              <div className={s.auth}>
                <AddFluffy />
                <AvatarIcon />
              </div>
            ) : (
              <div className={s.auth}>
                <NavLink
                  to="/login"
                  className={classNames(s.authButton, s.authButtonLogin)}
                  onClick={hideNavigation}
                >
                  Log In
                </NavLink>

                <NavLink
                  to="/register"
                  className={classNames(s.authButton, s.authButtonRegister)}
                  onClick={hideNavigation}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        )}
      </header>

      <Outlet />
    </div>
  )
}

export default App

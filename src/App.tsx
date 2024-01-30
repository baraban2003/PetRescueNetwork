import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import classNames from "classnames"
import s from "./app.module.css"
import Logo from "./assets/icons/logo.svg?react"
import { Footer } from "./components/Footer"

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(s.navbar, {
    [s.navbar__active]: isActive,
  })

export function App() {
  const location = useLocation()

  return (
    <div>
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
      </header>
      <Outlet />
      <Footer />
    </div>
  )
}

export default App

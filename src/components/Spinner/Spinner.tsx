import s from "./Spinner.module.css"
import Logo from "../../assets/images/spinner.svg?react"

export const Spinner = () => {
  return (
    <div className={s.spinnerContainer}>
      <div className={s.logo}>
        <Logo />
      </div>
    </div>
  )
}

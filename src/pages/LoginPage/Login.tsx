import { useState } from "react"
import { useDispatch } from "react-redux"
import authOperations from "../../redux/auth/authOperations"
import { useNavigate } from "react-router-dom"
import s from "./Login.module.css"
import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import * as navigationVisibleAction from "../../redux/navigationVisible/navigationVisibleSlice"
import { unwrapResult } from "@reduxjs/toolkit"
import { HiEye, HiEyeOff } from "react-icons/hi"
import CloseIcon from "../../assets/icons/close.svg?react"
import dogSide from "../../assets/images/dogSide.png"
import classNames from "classnames"
import { toast } from "react-toastify"

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isButtonActive = () => {
    let result = email.trim() !== "" && password.trim() !== ""

    return result
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const resultAction = await dispatch(authOperations.logIn(formData) as any)
      const result = unwrapResult(resultAction)

      if (result.status !== 404) {
        reset()
        navigate("/")
        dispatch(navigationVisibleAction.showNavigation())
        sessionStorage.setItem("navigationVisible", "true")
      } else {
        toast.error("Please fill the correct data")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const reset = () => {
    setFormData({
      email: "",
      password: "",
    })
  }

  const handleClose = () => {
    dispatch(navigationVisibleAction.showNavigation())
    sessionStorage.setItem("navigationVisible", "true")
  }

  return (
    <div className={s.login}>
      <div className={s.login__block}>
        <div className={s.logoButtons}>
          <Link to="/" className={s.logoButton} onClick={handleClose}>
            <CloseIcon />
          </Link>
        </div>
        <h1 className={s.login__title}>Welcome back</h1>
        <p className={s.login__acc}>
          New user?{" "}
          <Link className={s.login__link} to="/register">
            Create an account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
          <Form.Group className={s.group}>
            <div className={classNames(s.label, s.inputEmail)}>
              <span className={s.label__text}>Email address</span>
              <Form.Control
                className={s.input}
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="on"
                required
              />
            </div>

            <div className={classNames(s.label, s.inputPass)}>
              <span className={s.label__text}>Password</span>

              <Form.Control
                className={s.input}
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <div className={s.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </div>
            </div>
          </Form.Group>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isButtonActive()}
            className={s.button}
          >
            Continue
          </button>
        </form>
        <img src={dogSide} alt="dog" className={s.login__picture} />
      </div>
    </div>
  )
}

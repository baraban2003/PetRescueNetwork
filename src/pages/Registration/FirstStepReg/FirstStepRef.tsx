import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import s from "../FirstStepReg/FirstStepRef.module.css"
import { HiEye, HiEyeOff } from "react-icons/hi"
import classNames from "classnames"

type Props = {
  email: string
  password: string
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  validateEmail: boolean
  validatePasswordLength: boolean
  validatePasswordCase: boolean
  validatePasswordNumber: boolean
}

export const FirstStepRef: React.FC<Props> = ({
  email,
  password,
  handleChange,
  validateEmail,
  validatePasswordLength,
  validatePasswordCase,
  validatePasswordNumber,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div>
      <Form.Group className={s.group}>
        <div className={classNames(s.label, s.inputEmail)}>
          <span className={s.label__text}>Email address</span>
          <Form.Control
            className={classNames(s.input, {
              [s.inputError]: validateEmail,
            })}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="on"
            required
          />

          <ul className={s.errorBlock}>
            {validateEmail && (
              <li className={s.error}>That's an invalid email</li>
            )}
          </ul>
        </div>

        <div className={classNames(s.label, s.inputPass)}>
          <span className={s.label__text}>Password</span>
          <Form.Control
            className={classNames(s.input, {
              [s.inputError]:
                validatePasswordLength ||
                validatePasswordCase ||
                validatePasswordNumber,
            })}
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

          <ul className={s.errorBlock}>
            {validatePasswordLength && (
              <li className={s.error}>Contrains at least 8 characters</li>
            )}
            {validatePasswordCase && (
              <li className={s.error}>
                Contrains both lower (a-z) and upper case letters (A-Z)
              </li>
            )}
            {validatePasswordNumber && (
              <li className={s.error}>
                Contrains at least one number (0-9) or a symbol
              </li>
            )}
          </ul>
        </div>
      </Form.Group>
    </div>
  )
}

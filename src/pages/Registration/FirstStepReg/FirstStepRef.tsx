import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import s from "../FirstStepReg/FirstStepRef.module.css"
import { HiEye, HiEyeOff } from "react-icons/hi"

type Props = {
  email: string
  password: string
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export const FirstStepRef: React.FC<Props> = ({
  email,
  password,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div>
      <Form.Group className={s.group}>
        <Form.Label className={s.label}>
          Email address
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
        </Form.Label>

        <Form.Label className={s.label}>
          Password
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
        </Form.Label>
      </Form.Group>
    </div>
  )
}

import { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import authOperations from "../../redux/auth/authOperations"
import s from "../SignIn/SignIn.module.css"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case "email":
        setEmail(value)
        break

      case "password":
        setPassword(value)
        break

      default:
        return
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(authOperations.logIn({ email, password }))

    reset()
  }

  const reset = () => {
    setEmail("")
    setPassword("")
  }

  return (
    <div>
      <h1>Authorization page</h1>

      <Form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={s.label}>
            Email address
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={s.label}>
            Password
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  )
}

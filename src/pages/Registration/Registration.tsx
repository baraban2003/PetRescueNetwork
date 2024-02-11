import { useState } from "react"
import authOperations from "../../redux/auth/authOperations"
import s from "../Registration/Registration.module.css"
import { FirstStepRef } from "./FirstStepReg/FirstStepRef"
import { SecondStepRef } from "./SecondStepReg/SecondStepReg"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { unwrapResult } from "@reduxjs/toolkit"
import classNames from "classnames"
import CloseIcon from "../../assets/icons/close.svg?react"
import ArrowLeft from "../../assets/icons/arrowLeft.svg?react"
import { useAppDispatch } from "../../services/hooks"
import * as navigationVisibleAction from "../../redux/navigationVisible/navigationVisibleSlice"
import dogSide from "../../assets/images/dogSide.png"

export const Registration = () => {
  const TOTAL_STEPS = 2
  const [currentStep, setCurrentStep] = useState(1)
  const [validateEmail, setValidateEmail] = useState(false)
  const [validatePasswordLength, setValidatePasswordLength] = useState(false)
  const [validatePasswordCase, setValidatePasswordCase] = useState(false)
  const [validatePasswordNumber, setValidatePasswordNumber] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    secondName: "",
    phone: "",
  })

  const dispatch = useAppDispatch()

  const { email, password, name, secondName, phone } = formData

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    if (name === "email") {
      setValidateEmail(false)
    }

    if (name === "password") {
      setValidatePasswordNumber(false)
      setValidatePasswordCase(false)
      setValidatePasswordLength(false)
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }))
  }

  const handleNextPage = () => {
    const isCurrentStepValid = validateCurrentStep()
    const isCurrentEmailValid = getValidEmail()
    const isPasswordLength = isPasswordLengthValid(password)
    const isPasswordCase = isPasswordCasesValid(password)
    const isPasswordHasNumber = containsNumberOrSymbol(password)

    if (!isCurrentEmailValid) {
      setValidateEmail(true)
    }

    if (!isPasswordHasNumber) {
      setValidatePasswordNumber(true)
    }

    if (!isPasswordCase) {
      setValidatePasswordCase(true)
    }

    if (!isPasswordLength) {
      setValidatePasswordLength(true)
    }

    if (isCurrentStepValid) {
      setCurrentStep((prevStep) => prevStep + 1)
    } else {
      toast.error("Please add your email and password")
    }
  }

  const getValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)

    return isEmailValid
  }

  const isPasswordLengthValid = (value: string) => {
    return value.length >= 8
  }

  const isPasswordCasesValid = (value: string) => {
    return /[a-z]/.test(value) && /[A-Z]/.test(value)
  }

  const containsNumberOrSymbol = (value: string) => {
    return /\d|[^a-zA-Z0-9]/.test(value)
  }

  const validateCurrentStep = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|[^a-zA-Z0-9]).{8,}$/
    const isPasswordValid = passwordRegex.test(password)
    return isEmailValid && isPasswordValid
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const validateSubbmit = () => {
    const isSecondFormValid =
      name.trim() !== "" && secondName.trim() !== "" && phone.trim() !== ""

    return isSecondFormValid
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const isFormDataValid = validateSubbmit()

    if (!isFormDataValid) {
      toast.error("Please fill the empty fields!")
      return
    }

    try {
      const resultAction = await dispatch(
        authOperations.register(formData) as any,
      )
      const result = unwrapResult(resultAction)

      if (result.status !== 404) {
        reset()
        setCurrentStep(1)
      } else {
        console.error("404 Error: Resource not found")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const reset = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      secondName: "",
      phone: "",
    })
  }

  return (
    <div className={s.registration}>
      <div className={s.registration__block}>
        <div className={s.logoButtons}>
          {currentStep === 2 ? (
            <div className={s.logoButton} onClick={handleBack}>
              <ArrowLeft />
            </div>
          ) : (
            <div></div>
          )}

          <Link
            to="/"
            className={s.logoButton}
            onClick={() => dispatch(navigationVisibleAction.showNavigation())}
          >
            <CloseIcon />
          </Link>
        </div>

        <p className={s.registration__step}>
          STEP {currentStep} of {TOTAL_STEPS}
        </p>
        <h1 className={s.registration__title}>Create an account</h1>
        <p className={s.registration__acc}>
          Already have an account?{" "}
          <Link className={s.registration__link} to="/login">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
          {currentStep === 1 && (
            <FirstStepRef
              email={email}
              password={password}
              handleChange={handleChange}
              validateEmail={validateEmail}
              validatePasswordLength={validatePasswordLength}
              validatePasswordCase={validatePasswordCase}
              validatePasswordNumber={validatePasswordNumber}
            />
          )}
          {currentStep === 2 && (
            <SecondStepRef
              name={name}
              secondName={secondName}
              phone={phone}
              handleChange={handleChange}
              handlePhoneChange={handlePhoneChange}
            />
          )}

          <div className={s.buttonContainer}>
            {currentStep > 1 && (
              <button
                className={classNames(s.button, s.button__back)}
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                className={classNames(s.button, s.button__continue)}
                type="button"
                onClick={handleNextPage}
              >
                Continue
              </button>
            ) : (
              <button
                className={classNames(s.button, s.button__submit)}
                type="button"
                onClick={handleSubmit}
                disabled={!validateSubbmit()}
              >
                Submit
              </button>
            )}
          </div>
        </form>
        <img src={dogSide} alt="dog" className={s.registration__picture} />
      </div>
    </div>
  )
}

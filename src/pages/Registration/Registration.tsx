import { useState } from "react"
import { useDispatch } from "react-redux"
import authOperations from "../../redux/auth/authOperations"
import s from "../Registration/Registration.module.css"
import { FirstStepRef } from "./FirstStepReg/FirstStepRef"
import { SecondStepRef } from "./SecondStepReg/SecondStepReg"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { unwrapResult } from "@reduxjs/toolkit"
import { Spinner } from "../Spinner"

export const Registration = () => {
  const TOTAL_STEPS = 2
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    secondName: "",
    date: "",
    phone: "",
  })

  const { email, password, name, secondName, date, phone } = formData

  const dispatch = useDispatch()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
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

    if (isCurrentStepValid) {
      setCurrentStep((prevStep) => prevStep + 1)
    } else {
      toast.error("Please add your email and password")
    }
  }

  const validateCurrentStep = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)
    const isPasswordValid = password.trim() !== ""
    return isEmailValid && isPasswordValid
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const validateSubbmit = () => {
    const isSecondFormValid =
      name.trim() !== "" &&
      secondName.trim() !== "" &&
      date.trim() !== "" &&
      phone.trim() !== ""

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
      date: "",
      phone: "",
    })
  }
  return (
    <div>
      <p>
        STEP {currentStep} of {TOTAL_STEPS}
      </p>
      <h1>Create an account</h1>
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        {currentStep === 1 && (
          <FirstStepRef
            email={email}
            password={password}
            handleChange={handleChange}
          />
        )}
        {currentStep === 2 && (
          <SecondStepRef
            name={name}
            secondName={secondName}
            date={date}
            phone={phone}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
          />
        )}

        <div className={s.buttonContainer}>
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}

          {currentStep < TOTAL_STEPS ? (
            <button type="button" onClick={handleNextPage}>
              Continue
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

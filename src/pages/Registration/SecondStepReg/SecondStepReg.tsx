import React from "react"
import Form from "react-bootstrap/Form"
import s from "../SecondStepReg/SecondStepRef.module.css"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

type Props = {
  name: string
  secondName: string
  date: string
  phone: string
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handlePhoneChange: (value: string) => void
}

export const SecondStepRef: React.FC<Props> = ({
  name,
  secondName,
  date,
  phone,
  handleChange,
  handlePhoneChange,
}) => {
  return (
    <div>
      <Form.Group className={s.group}>
        <Form.Label className={s.label}>
          <span className={s.label__text}> Enter your first name</span>

          <Form.Control
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </Form.Label>

        <Form.Label className={s.label}>
          <span className={s.label__text}> Enter your second name</span>

          <Form.Control
            className={s.input}
            type="text"
            name="secondName"
            value={secondName}
            onChange={handleChange}
            placeholder="Enter your second name"
            required
          />
        </Form.Label>

        <Form.Label className={s.label}>
          <span className={s.label__text}>Date of birth</span>

          <Form.Control
            className={s.input}
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            placeholder="Date"
            required
          />
        </Form.Label>

        <Form.Label className={s.label}>
          <span className={s.label__text}>What’s your mobile number?</span>

          <PhoneInput
            containerStyle={{
              fontFamily: "inherit",
              boxSizing: "border-box",
              maxWidth: "640px",
              height: "48px",
              borderRadius: "30px",
              border: "1px solid #242629",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
            }}
            inputStyle={{
              fontSize: "100%",
              paddingLeft: "50px",
              borderWidth: 0,
              maxWidth: "95%",
            }}
            buttonStyle={{
              height: 24,
              top: 12,
              left: 16,
              borderWidth: 0,
              backgroundColor: "transparent",
            }}
            dropdownStyle={{
              borderRadius: 10,
            }}
            value={phone}
            country={"ua"}
            onChange={(value) => handlePhoneChange(value)}
            placeholder="What’s your mobile number?"
          />
        </Form.Label>
      </Form.Group>
    </div>
  )
}

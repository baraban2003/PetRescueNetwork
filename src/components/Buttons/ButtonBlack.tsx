import React from "react"
import s from "./Buttons.module.css"

type Props = {
  buttonBlackName: string
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean | undefined
}

export const ButtonBlack: React.FC<Props> = ({
  buttonBlackName,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      className={s.buttonBlack}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {buttonBlackName}
    </button>
  )
}

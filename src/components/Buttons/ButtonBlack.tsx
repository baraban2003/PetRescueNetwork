import React from "react"
import s from "./Buttons.module.css"

type Props = {
  buttonBlackName: string
  onClick: () => void
}

export const ButtonBlack: React.FC<Props> = ({ buttonBlackName, onClick }) => {
  return (
    <button className={s.buttonBlack} onClick={onClick}>
      {buttonBlackName}
    </button>
  )
}

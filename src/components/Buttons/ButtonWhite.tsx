import React from "react"
import s from "./Buttons.module.css"

type Props = {
  buttonWhiteName: string
  onClick: () => void
}

export const ButtonWhite: React.FC<Props> = ({ buttonWhiteName, onClick }) => {
  return (
    <button className={s.buttonWite} onClick={onClick}>
      {buttonWhiteName}
    </button>
  )
}

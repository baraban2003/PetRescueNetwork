import React from "react"
import s from "./ProgressBar.module.css"

type Props = {
  maxPriceForHelp: number
  intAccumulated: number
}

export const ProgressBar: React.FC<Props> = ({
  maxPriceForHelp,
  intAccumulated,
}) => {
  const completed = Math.round((intAccumulated * 100) / maxPriceForHelp)

  return (
    <div className={s.containerStyles}>
      <div className={s.fillerStyles} style={{ width: `${completed}%` }}></div>
    </div>
  )
}

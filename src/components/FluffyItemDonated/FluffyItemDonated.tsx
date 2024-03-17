import React from "react"

import s from "./FluffyItemDonated.module.css"
import { ProgressBar } from "../ProgressBar"
import { ButtonWhite } from "../Buttons/ButtonWhite"

type Props = {
  friend: {
    img: string | undefined
    title: string
    sex?: string
    age?: string
    maxPriceForHelp: number
    intAccumulated: number
    comment?: string
  }
  handleClick: () => void
}

export const FluffyItemDonated: React.FC<Props> = ({ friend, handleClick }) => {
  const { img, title, sex, age, maxPriceForHelp, intAccumulated, comment } =
    friend

  const formattedNumber = (num: number) => {
    const formatting = num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return formatting.replace(/,/g, " ")
  }

  const isShowAgeSex = () => {
    return sex !== "" || age !== ""
  }

  const isCommaShow = () => {
    if (sex !== "" && age !== "") return ","
    else {
      return ""
    }
  }

  return (
    <li className={s.card}>
      <img
        src={img}
        alt="friend"
        className={s.cardImage}
        onClick={handleClick}
      />

      <div className={s.cardText}>
        <h3 className={s.cardTitle} onClick={handleClick}>
          {title} {comment}
        </h3>

        <div className={s.cardInfoBlock} onClick={handleClick}>
          {isShowAgeSex() && (
            <p className={s.cardInfo}>{`${sex}${isCommaShow()} ${age}`}</p>
          )}
        </div>

        <div className={s.invest}>
          <div className={s.investTop}>
            <p className={s.investTopElement}>{`${formattedNumber(
              maxPriceForHelp,
            )} UAH`}</p>
          </div>

          <div className={s.line}>
            <ProgressBar
              maxPriceForHelp={maxPriceForHelp}
              intAccumulated={intAccumulated}
            />
          </div>

          <div className={s.investBottom}>
            <p>Accumulated</p>
            <p className={s.investBottomElement}>{`${formattedNumber(
              intAccumulated,
            )} UAH`}</p>
          </div>
        </div>

        <div className={s.buttons}>
          <ButtonWhite buttonWhiteName={"See report"} onClick={handleClick} />
        </div>
      </div>
    </li>
  )
}

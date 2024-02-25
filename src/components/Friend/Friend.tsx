import React, { useState } from "react"
import LikeIcon from "../../assets/icons/likeIcon.svg?react"

import s from "./Friend.module.css"
import { ProgressBar } from "../ProgressBar"
import { ButtonWhite } from "../Buttons/ButtonWhite"
import { ButtonBlack } from "../Buttons/ButtonBlack"

type Props = {
  friend: {
    img: string | undefined
    title: string
    sex?: string
    age?: string
    maxPriceForHelp: number
    intAccumulated: number
  }
}

export const Friend: React.FC<Props> = ({ friend }) => {
  // const [showModal, setShowModal] = useState(false);
  const { img, title, sex, age, maxPriceForHelp, intAccumulated } = friend

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

  const handleAdoptClick = () => {
    // Handle click for profile button
  }

  const handleDonateClick = () => {
    // Handle click for profile button
  }

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <li className={s.card}>
      <img src={img} alt="friend" className={s.cardImage} />

      <div className={s.likeIcon}>
        <LikeIcon />
      </div>

      <div className={s.cardText}>
        <h3 className={s.cardTitle}>{title}</h3>

        <div className={s.cardInfoBlock}>
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
          <ButtonWhite buttonWhiteName={"Adopt"} onClick={handleAdoptClick} />
          <ButtonBlack buttonBlackName={"Donate"} onClick={handleDonateClick} />
        </div>
      </div>

      {/* {showModal && <TimeModal timeTable={workDays} />} */}
    </li>
  )
}

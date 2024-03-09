import React from "react"
import s from "./FriendDetailed.module.css"
import CloseIcon from "../../assets/icons/close.svg?react"
import { ProgressBar } from "../ProgressBar"
import { ButtonWhite } from "../Buttons/ButtonWhite"
import { ButtonBlack } from "../Buttons/ButtonBlack"

type Props = {
  friendDetailed: {
    id: number
    name: string
    type: string
    healthCondition: string
    sterilization: string
    size: string
    location: string
    habitat: string
    sex?: string
    age: string
    priceForDonate: number
    accumulatedPrice: number
    comments?: string
    img?: string
  }
  onClose: () => void
}

export const FriendDetailed: React.FC<Props> = ({
  friendDetailed,
  onClose,
}) => {
  if (!friendDetailed) {
    return null
  }

  const {
    name,
    type,
    age,
    sex = "Boy",
    healthCondition,
    sterilization,
    size,
    location,
    habitat,
    comments,
    priceForDonate,
    accumulatedPrice,
    img,
  } = friendDetailed

  const formattedNumber = (num: number) => {
    const formatting = num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return formatting.replace(/,/g, " ")
  }

  const handleAdoptClick = () => {
    // Handle click for profile button
  }

  const handleDonateClick = () => {
    // Handle click for profile button
  }

  return (
    <div className={s.card}>
      <div className={s.cardText}>
        <div className={s.cardLeftSide}>
          <img src={img} alt="friend" className={s.cardImage} />

          <div className={s.invest}>
            <div className={s.investTop}>
              <p className={s.investTopElement}>{`${formattedNumber(
                priceForDonate,
              )} UAH`}</p>
            </div>

            <div className={s.line}>
              <ProgressBar
                maxPriceForHelp={priceForDonate}
                intAccumulated={accumulatedPrice}
              />
            </div>

            <div className={s.investBottom}>
              <p>Accumulated</p>
              <p className={s.investBottomElement}>{`${formattedNumber(
                accumulatedPrice,
              )} UAH`}</p>
            </div>
          </div>

          <p className={s.cardLeftSideLink}>See reports</p>
          <p className={s.cardLeftSideLink}>See benefactors</p>
        </div>

        <div className={s.cardRightSide}>
          <div>
            <h2 className={s.cardRightSideTitle}>{name}</h2>

            <p className={s.item}>
              Type: <span className={s.itemText}>{type}</span>
            </p>
            <p className={s.item}>
              Age: <span className={s.itemText}>{age}</span>
            </p>
            <p className={s.item}>
              Sex: <span className={s.itemText}>{sex}</span>
            </p>
            <p className={s.item}>
              Health condition:{" "}
              <span className={s.itemText}>{healthCondition}</span>
            </p>
            <p className={s.item}>
              Sterilization: <span className={s.itemText}>{sterilization}</span>
            </p>
            <p className={s.item}>
              Size: <span className={s.itemText}>{size}</span>
            </p>
            <p className={s.item}>
              Location: <span className={s.itemText}>{location}</span>
            </p>
            <p className={s.item}>
              Habitat: <span className={s.itemText}>{habitat}</span>
            </p>
            <p className={s.itemComment}>
              My story:
              <br />
              <span className={s.itemText}>{comments}</span>
            </p>
          </div>

          <div className={s.logoButton} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
      </div>

      <div>
        <div className={s.button}>
          <ButtonWhite buttonWhiteName={"Adopt"} onClick={handleAdoptClick} />
        </div>
        <ButtonBlack buttonBlackName={"Donate"} onClick={handleDonateClick} />
      </div>
    </div>
  )
}

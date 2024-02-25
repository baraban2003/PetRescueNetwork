import authOperations from "../../redux/auth/authOperations"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { ButtonBlack } from "../Buttons/ButtonBlack"
import { ButtonWhite } from "../Buttons/ButtonWhite"
import s from "./ProfileModal.module.css"

export const ProfileModal = () => {
  const name = useAppSelector((state) => state.auth.user.firstName)
  const dispatch = useAppDispatch()

  const handleProfileClick = () => {
    // Handle click for profile button
  }

  const handleHelpClick = () => {
    // Handle click for help button
  }

  const handleSignOutClick = () => {
    dispatch(authOperations.logOut())
  }

  return (
    <div>
      <h3 className={s.hero}>
        You're a hero, <span className={s.heroName}>{name}</span>
      </h3>
      <div className={s.buttons}>
        <div className={s.heroProfileButton}>
          <ButtonWhite
            buttonWhiteName={"Your profile"}
            onClick={handleProfileClick}
          />
        </div>

        <div className={s.heroHelpButton}>
          <ButtonWhite buttonWhiteName={"Help"} onClick={handleHelpClick} />
        </div>

        <div className={s.heroSignOutButton}>
          <ButtonBlack
            buttonBlackName={"Sing out"}
            onClick={handleSignOutClick}
          />
        </div>
      </div>
    </div>
  )
}

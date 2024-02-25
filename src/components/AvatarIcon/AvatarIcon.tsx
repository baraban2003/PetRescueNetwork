import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import s from "./AvatarIcon.module.css"
import { Modal } from "../Modal"
import { useAppSelector } from "../../services/hooks"
import { ProfileModal } from "../ProfileModal"

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}

export default function AvatarIcon() {
  const [modalOpen, setModalOpen] = useState(false)

  function handleClick() {
    setModalOpen(true)
  }
  const name = useAppSelector((state) => state.auth.user.firstName)
  const secondName = useAppSelector((state) => state.auth.user.lastName)

  return (
    <div>
      <div onClick={handleClick}>
        <Avatar {...stringAvatar(`${name} ${secondName}`)} />
      </div>
      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
          isOverlay={false}
          isAvatarModal={true}
        >
          <ProfileModal />
        </Modal>
      )}
    </div>
  )
}

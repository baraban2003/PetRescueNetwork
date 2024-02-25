import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import s from "./Modal.module.css"
import classNames from "classnames"

interface Props {
  onClose: () => void
  isOpen: boolean
  children: React.ReactNode
  isOverlay: boolean
  isAvatarModal: boolean
}

export const Modal: React.FC<Props> = ({
  onClose,
  children,
  isOpen,
  isOverlay,
  isAvatarModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleBodyScroll = () => {
      if (isOpen) {
        document.body.classList.add("modalOpen")
      } else {
        document.body.classList.remove("modalOpen")
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      handleBodyScroll()
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("modalOpen")
    }
  }, [isOpen, onClose])

  const handlBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }

  return isOpen
    ? createPortal(
        <div
          className={classNames({
            [s.modalOverlay]: isOverlay,
            [s.modalOverlayNone]: !isOverlay,
          })}
          onClick={handlBackdropClick}
        >
          <div
            className={classNames({
              [s.modal]: !isAvatarModal,
              [s.avatarModal]: isAvatarModal,
            })}
          >
            {children}
          </div>
        </div>,
        document.body,
      )
    : null
}

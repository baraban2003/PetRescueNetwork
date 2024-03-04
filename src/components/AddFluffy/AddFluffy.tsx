import { useState } from "react"
import classNames from "classnames"
import s from "./AddFluffy.module.css"
import { Modal } from "../Modal"
import { AddFluffyForm } from "../AddFluffyForm"

export const AddFluffy = () => {
  const [modalOpen, setModalOpen] = useState(false)

  function handleClick() {
    setModalOpen(true)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={classNames(s.authButton, s.authButtonRegister)}
      >
        Add fluffy in need
      </button>

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
          isOverlay={true}
          isAvatarModal={false}
        >
          <AddFluffyForm setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  )
}

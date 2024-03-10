import { useEffect, useState } from "react"
import fluffiesOperation from "../../redux/fluffies/fluffiesOperations"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { Spinner } from "../Spinner"
import { Friend } from "../Friend"
import s from "./FluffiesList.module.css"
import { Fluffy } from "../../types/Fluffy"
import { Modal } from "../Modal"
import { FriendDetailed } from "../FriendDetailed"
import oneFluffyOperation from "../../redux/oneFluffy/oneFluffyOperations"
import LeftArrow from "../../assets/icons/paginationLeft.svg?react"
import RightArrow from "../../assets/icons/paginationRight.svg?react"

interface FluffiesState {
  isLoading: boolean
  items: Fluffy[]
}

interface OneFluffy {
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

export const FluffiesList = () => {
  const { isLoading, items } = useAppSelector(
    (state) => state.getFluffies,
  ) as FluffiesState
  const [page, setPage] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const itemsPerPage = 16

  const dispatch = useAppDispatch()
  const oneFluffy = useAppSelector(
    (state) => state.getOneFluffy.item,
  ) as OneFluffy

  useEffect(() => {
    dispatch(fluffiesOperation.fetchFluffies({}))
  }, [dispatch])

  const handleClick = (friend: Fluffy) => {
    dispatch(oneFluffyOperation.fetchOneFluffy(friend.id))
    setModalOpen(true)
  }

  const totalPages = Math.ceil(items.length / itemsPerPage)
  if (page > totalPages) {
    setPage(0)
  }
  const startIndex = page * itemsPerPage
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className={s.fluffies}>
      {isLoading && <Spinner />}
      <ul className={s.fluffiesList}>
        {displayedItems.map((e) => (
          <Friend
            key={e.id}
            handleClick={() => handleClick(e)}
            friend={{
              img: e.imageUrl,
              title: e?.title || "",
              sex: e.sex,
              age: e.age,
              maxPriceForHelp: e.priceForDonate || 0,
              intAccumulated: e.accumulatedPrice || 0,
              comment: e.comments,
            }}
          />
        ))}
      </ul>

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
          isOverlay={true}
          isAvatarModal={false}
        >
          <FriendDetailed
            friendDetailed={oneFluffy}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}

      <div className={s.pagination}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
          disabled={page === 0}
          className={s.invisibleButton}
        >
          <LeftArrow />
        </button>
        <span>{`Page ${page + 1} of ${totalPages}`}</span>
        <button
          onClick={() =>
            setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
          }
          disabled={page === totalPages - 1}
          className={s.invisibleButton}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  )
}

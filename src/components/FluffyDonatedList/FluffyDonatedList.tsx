import { useEffect, useState } from "react"
import fluffiesOperation from "../../redux/fluffies/fluffiesOperations"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { Spinner } from "../Spinner"
import s from "./FluffyDonatedList.module.css"
import { Fluffy } from "../../types/Fluffy"
import { Modal } from "../Modal"
import { FriendDetailed } from "../FriendDetailed"
import oneFluffyOperation from "../../redux/oneFluffy/oneFluffyOperations"
import { FluffyItemDonated } from "../FluffyItemDonated"

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

export const FluffyDonatedList = () => {
  const { isLoading, items } = useAppSelector(
    (state) => state.getFluffies,
  ) as FluffiesState
  const [page, setPage] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState(false)
  const itemsPerPage = 99999

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
  const displayedItemsFiltered = displayedItems.filter(
    (e) =>
      e.priceForDonate === e.accumulatedPrice &&
      e.priceForDonate !== 0 &&
      e.accumulatedPrice !== 0,
  )

  return (
    <div className={s.fluffies}>
      {isLoading && <Spinner />}
      <ul className={s.fluffiesList}>
        {displayedItemsFiltered.map((e) => (
          <FluffyItemDonated
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
    </div>
  )
}

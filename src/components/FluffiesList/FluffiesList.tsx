import { useEffect, useState } from "react"
import fluffiesOperation from "../../redux/fluffies/fluffiesOperations"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { Spinner } from "../Spinner"
import { Friend } from "../Friend"
import s from "./FluffiesList.module.css"
import { Fluffy } from "../../types/Fluffy"
import { Pagination } from "@mui/material"
import { fetchTotalItemCount } from "../../services/fetchAllIems"
import { Modal } from "../Modal"
import { FriendDetailed } from "../FriendDetailed"
import oneFluffyOperation from "../../redux/oneFluffy/oneFluffyOperations"

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
  const [itemLength, setItemLength] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useAppDispatch()
  const oneFluffy = useAppSelector(
    (state) => state.getOneFluffy.item,
  ) as OneFluffy

  const itemsPerPage = 16

  useEffect(() => {
    dispatch(fluffiesOperation.fetchFluffies(page))
  }, [dispatch, page])

  useEffect(() => {
    const fetchDataAndSetLength = async () => {
      const itemCount = await fetchTotalItemCount()
      setItemLength(itemCount)
    }

    fetchDataAndSetLength()
  }, [])

  const totalPages = Math.ceil(itemLength / itemsPerPage)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPage(page - 1)
  }

  const handleClick = (friend: Fluffy) => {
    dispatch(oneFluffyOperation.fetchOneFluffy(friend.id))
    setModalOpen(true)
  }

  return (
    <div className={s.fluffies}>
      {isLoading && <Spinner />}
      <ul className={s.fluffiesList}>
        {items.map((e) => (
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
        <Pagination
          count={totalPages}
          page={page + 1}
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

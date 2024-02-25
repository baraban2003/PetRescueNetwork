import { useEffect, useRef, useState } from "react"
import fetchFluffies from "../../redux/fluffies/fluffiesOperations"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { toast } from "react-toastify"
import { Spinner } from "../Spinner"
import { Friend } from "../Friend"
import s from "./FluffiesList.module.css"

export const FluffiesList = () => {
  const dispatch = useAppDispatch()
  const { isLoading, items } = useAppSelector((state) => state.getFluffies)

  const [page, setPage] = useState<number>(0)
  const loaderRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (
      loaderRef.current &&
      loaderRef.current.getBoundingClientRect().top <= window.innerHeight
    ) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchFluffies(page))
  }, [dispatch, page])

  return (
    <div className={s.fluffies}>
      {isLoading && <Spinner />}

      <ul className={s.fluffiesList}>
        {items.map((e) => (
          <Friend
            key={e.id}
            friend={{
              img: e.imageUrl,
              title: e.title,
              sex: e.sex,
              age: e.age,
              maxPriceForHelp: e.priceForDonate,
              intAccumulated: e.accumulatedPrice,
            }}
          />
        ))}
      </ul>

      <div ref={loaderRef}></div>
    </div>
  )
}

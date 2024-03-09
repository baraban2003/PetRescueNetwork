import { Filters } from "../../components/Filters"
import { FluffiesList } from "../../components/FluffiesList"
import { fetchTotalItemCount } from "../../services/fetchAllIems"
import s from "./HelpForFluffiesPage.module.css"
import fluffiesOperation from "../../redux/fluffies/fluffiesOperations"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../services/hooks"

export const HelpForFluffiesPage = () => {
  const [length, setLength] = useState(0)

  const { isLoading } = useAppSelector((state) => state.getFluffies)

  const fetchAndUpdateLength = async () => {
    const itemCount = await fetchTotalItemCount()
    setLength(itemCount)
  }

  useEffect(() => {
    fetchAndUpdateLength()
  }, [isLoading])

  const getProjectWord = length === 1 ? "project" : "projects"

  return (
    <div>
      <div className={s.filter}>
        <p className={s.fluffiesCalc}>{`${length} ${getProjectWord} `} found</p>
        <Filters />
      </div>
      <FluffiesList />
    </div>
  )
}

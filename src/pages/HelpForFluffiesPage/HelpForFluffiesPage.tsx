import { Filters } from "../../components/Filters"
import { FluffiesList } from "../../components/FluffiesList"
import { fetchTotalItemCount } from "../../services/fetchAllIems"
import s from "./HelpForFluffiesPage.module.css"
import axios from "axios"
import { useEffect, useState } from "react"

export const HelpForFluffiesPage = () => {
  const [length, setLength] = useState(0)

  useEffect(() => {
    const fetchDataAndSetLength = async () => {
      const itemCount = await fetchTotalItemCount()
      setLength(itemCount)
    }

    fetchDataAndSetLength()
  }, [])

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

import { Filters } from "../../components/Filters"
import { FluffiesList } from "../../components/FluffiesList"
import s from "./HelpForFluffiesPage.module.css"
import { useAppSelector } from "../../services/hooks"

export const HelpForFluffiesPage = () => {
  const length = useAppSelector((state) => state.getFluffies.items).length
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

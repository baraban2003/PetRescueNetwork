import { Filters } from "../../components/Filters"
import { FluffiesList } from "../../components/FluffiesList"
import { useAppSelector } from "../../services/hooks"
import s from "./HelpForFluffiesPage.module.css"

export const HelpForFluffiesPage = () => {
  const { isLoading, items } = useAppSelector((state) => state.getFluffies)

  const getProjectWord = items.length === 1 ? "project" : "projects"
  return (
    <div>
      <div className={s.filter}>
        <p className={s.fluffiesCalc}>
          {`${items.length} ${getProjectWord} `} found
        </p>
        <Filters />
      </div>

      <FluffiesList />
    </div>
  )
}

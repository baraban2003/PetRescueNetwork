import { FluffyDonatedList } from "../../components/FluffyDonatedList"
import s from "./KindHearts.module.css"

export const KindHearts = () => {
  return (
    <div className={s.page}>
      <section className={s.leftSide}>
        <h1 className={s.leftSideTitle}>We in numbers</h1>
        <ul className={s.leftSideStat}>
          <li className={s.leftSideStatItems}>
            <span className={s.leftSideStatItemsText}>We cured animals</span>
            <div className={s.leftSideStatNum}>
              <span className={s.leftSideStatItemsNumItem}>1045</span>
            </div>
          </li>
          <li className={s.leftSideStatItems}>
            <span className={s.leftSideStatItemsText}>We donated</span>
            <div className={s.leftSideStatNum}>
              <span className={s.leftSideStatItemsNumItem}>
                234 545
                <br /> UAH
              </span>
            </div>
          </li>
          <li className={s.leftSideStatItems}>
            <span className={s.leftSideStatItemsText}>
              We saved little lives
            </span>
            <div className={s.leftSideStatNum}>
              <span className={s.leftSideStatItemsNumItem}>12939</span>
            </div>
          </li>
          <li className={s.leftSideStatItems}>
            <span className={s.leftSideStatItemsText}>
              Number of animals that <br /> found a home
            </span>
            <div className={s.leftSideStatNum}>
              <span className={s.leftSideStatItemsNumItem}>4505</span>
            </div>
          </li>
          <li className={s.leftSideStatItems}>
            <span className={s.leftSideStatItemsText}>
              Number of animals under our supervision
            </span>
            <div className={s.leftSideStatNum}>
              <span className={s.leftSideStatItemsNumItem}>3244</span>
            </div>
          </li>
        </ul>
      </section>

      <section className={s.articles}>
        <FluffyDonatedList />
      </section>
    </div>
  )
}

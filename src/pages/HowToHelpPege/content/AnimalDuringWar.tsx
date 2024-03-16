import s from "./Styles.module.css"
import threeExclamation from "../../../assets/images/threeExclamation.png"
import Dog from "../../../assets/icons/dogImage.svg?react"
import Cat from "../../../assets/icons/catImage.svg?react"
import { useEffect } from "react"

export function AnimalDuringWar() {
  useEffect(() => {
    const animateCount = (selector: string, targetNumber: number) => {
      let currentNumber = 16000
      const element = document.getElementById(selector)
      if (element) {
        const interval = setInterval(() => {
          currentNumber += Math.ceil(targetNumber / 100)
          if (currentNumber >= targetNumber) {
            clearInterval(interval)
            currentNumber = targetNumber
          }
          element.innerText = currentNumber.toString()
        }, 100)
      }
    }

    animateCount("dogCounter", 25799)
    animateCount("catCounter", 19473)
  }, [])

  return (
    <>
      <section className={s.duringWarBlock}>
        <div className={s.duringWarInfo}>
          <div className={s.duringWarImageBlock}>
            <img
              className={s.duringWarImage}
              src={threeExclamation}
              alt="Important ifo"
            />
          </div>

          <p className={s.duringWarInfoContent}>
            Due to Russia's full-scale invasion of Ukraine, the number of
            homeless animals in shelters has increased by
            <span className={s.percent}> 60%</span> since the beginning of 2022.
          </p>
        </div>

        <div className={s.duringWarStatistic}>
          <p className={s.duringWarStatisticHead}>
            Save pets of Ukraine made a census of <b>510</b> Ukrainian animal
            shelters.
          </p>
          <p className={s.duringWarStatisticInfo}>
            As of January 2023, they included animals:
          </p>
          <div className={s.duringWarStatisticCounter}>
            <div className={s.duringWarStatisticCounterBlock}>
              <div className={s.duringWarStatisticIcon}>
                <Dog />
              </div>
              <p className={s.duringWarStatisticNumber} id="dogCounter">
                0
              </p>
              <p className={s.duringWarStatisticAnimal}>dogs</p>
            </div>

            <div className={s.duringWarStatisticCounterBlock}>
              <div className={s.duringWarStatisticIcon}>
                <Cat />
              </div>
              <p className={s.duringWarStatisticNumber} id="catCounter">
                0
              </p>
              <p className={s.duringWarStatisticAnimal}>cats</p>
            </div>

            <p className={s.duringWarStatisticInfoItem}>
              The number of animals is constantly increasing...
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

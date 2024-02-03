import s from "./HomePage.module.css"

export function HomePage() {
  return (
    <>
      <section className={s.homePage}>
        <div className={s.homePage__picture}></div>
        <div className={s.homePage__block}>
          <h1 className={s.homePage__text}>
            Extend a Paw <br /> Share the Care
          </h1>
          <h2 className={s.homePage__text}>
            Support Our <br /> Fluffy Friends <br /> in Need.
          </h2>
        </div>
      </section>
    </>
  )
}

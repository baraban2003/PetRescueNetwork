import s from "./HomePage.module.css"

export function HomePage() {
  return (
    <>
      <section className={s.homePage}>
        <h1 className={s.homePage__text}>
          Extend a Paw <br /> Share the Care.
        </h1>

        <h2 className={s.homePage__text}>
          Support Fluffy <br /> Friends in Need.
        </h2>
      </section>
    </>
  )
}

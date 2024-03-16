import s from "./Styles.module.css"

export function PetOnTheStreet() {
  return (
    <div>
      <section className={s.street}>
        <h2 className={s.animalLockedTitle}>
          You found a pet on the street. What should you do?
        </h2>

        <div className={s.streetBlock}>
          <ul className={s.streetList}>
            <li className={s.streetItem}>
              Check the address book or qr passport.
            </li>
            <li className={s.streetItem}>
              Whether there is a sip under the skin (you can check it in a
              veterinary clinic):{" "}
            </li>
            <li className={s.streetItemEl}>
              a brand (a tattoo on the animal's ear or groin that contains
              information about the cattery).
            </li>
            <li className={s.streetItemEl}>
              a clip on the ear (this means that the animal is outdoor and
              sterilized)
            </li>
          </ul>

          <ul className={s.streetList}>
            <li className={s.streetItem}>
              Don't put the responsibility on shelters or volunteers, because
              they are already overcrowded and exhausted. If you are able to
              help at least one tail to return home, be sure to do everything
              you can!
            </li>
            <li className={s.streetItem}>
              If the animal is definitely a pet, it is most likely being
              searched for. Take a photo of the animal and post an announcement.{" "}
            </li>
            <li className={s.streetItem}>
              If the old owners of the animal have not been found, try to find a
              new home for it.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

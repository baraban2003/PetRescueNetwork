import classNames from "classnames"
import s from "./Styles.module.css"

export function PetAdoption() {
  return (
    <div className={s.adoption}>
      <section className={s.adoptionBlock}>
        <h2 className={s.animalLockedTitle}>
          In order to make an effective adoption announcement, you need to :
        </h2>
        <ul className={classNames(s.animalLockedList, s.adoptionList)}>
          <li className={s.animalLockedItem}>
            Take high-quality photos of the animal.
          </li>
          <li className={s.animalLockedItem}>Briefly describe its history.</li>
          <li className={s.animalLockedItem}>
            Place an add with photos, text, and your contact information.
          </li>
        </ul>
        <p className={s.adoptionText}>
          Important! To make sure that the person who wants to take the animal
          from you is responsible, make yourself a small questionnaire. Ask if
          they have experience keeping a dog or cat, what they will feed the
          animal, whether they know about parasite treatment, mandatory
          vaccinations, walking rules, the availability of anti-cat nets if you
          adopt a cat, etc. Answers to these questions will help you form an
          impression of the potential owner and make the right decision about
          their ability to take care of the animal properly.
        </p>
      </section>

      <section className={s.returnBlock}>
        <h2 className={s.animalLockedTitle}>
          Lost pets? <br />
          We help to bring pets back home!
        </h2>
        <ul className={classNames(s.animalLockedList, s.adoptionList)}>
          <li className={s.animalLockedItem}>
            If your own search for your pet has not yielded any results, please
            post an an announcement.{" "}
          </li>
          <li className={s.animalLockedItem}>
            Be sure to include high-quality photos of your pet.
          </li>
          <li className={s.animalLockedItem}>
            Make a detailed description of the animal (age, size, color of hair,
            eyes, gender, special features).
          </li>
          <li className={s.animalLockedItem}>
            Provide your contact information so that someone who knows the
            animal can contact you.
          </li>
          <li className={s.animalLockedItem}>
            Additionally, you can also write paper announcements and post them
            in the place where the animal is lost.
          </li>
        </ul>

        <p className={s.adoptionText}>
          When your pet gets lost, try not to be nervous and immediately think
          of a clear plan of action to get the tail back. We'll tell you what to
          do: first, carefully walk around the place where the dog got lost, or
          look in all the hidden corners of your home if you have a cat.
        </p>
      </section>
    </div>
  )
}

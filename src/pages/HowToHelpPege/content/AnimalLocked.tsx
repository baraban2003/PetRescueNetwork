import s from "./Styles.module.css"
import catWithHome from "../../../assets/images/catWithHome.png"

export function AnimalLocked() {
  return (
    <div className={s.animalLockedBlock}>
      <section className={s.animalLocked}>
        <h2 className={s.animalLockedTitle}>
          How to help an animal that is locked in an apartment :
        </h2>
        <ul className={s.animalLockedList}>
          <li className={s.animalLockedItem}>make a hole in the door</li>
          <li className={s.animalLockedItem}>
            Cut the food into small pieces and push it through the opening
          </li>
          <li className={s.animalLockedItem}>
            Stuff dry food through the hole
          </li>
          <li className={s.animalLockedItem}>
            Be sure to give water : it can be poured through a tube from a
            boiler hose or through a syringe. The animal will definitely lick
            the water off the floor.
          </li>
          <li className={s.animalLockedItem}>
            Contact the owner of the apartment. If you have the owner's
            permission, you can drill a larger hole to get the animal out.
          </li>
          <li className={s.animalLockedItem}>
            Use baskets to transport and catch animals.
          </li>
        </ul>
        <div className={s.animalLockedImageBlock}>
          <img
            className={s.animalLockedImage}
            src={catWithHome}
            alt="Cat with home image"
          />
        </div>
      </section>

      <section className={s.whatNotToDo}>
        <div className={s.notToDo}>
          <h2 className={s.animalLockedTitle}>What not to do :</h2>
          <ul className={s.animalLockedList}>
            <li className={s.notToDoItem}>
              Feeding stray animals bones or food with bones.
            </li>
            <li className={s.notToDoItem}>
              Touch stray animals with bare hands. Wear gloves when handling
              animals.
            </li>
            <li className={s.notToDoItem}>
              Catch by force if the animal does not make contact.
            </li>
          </ul>
        </div>

        <div className={s.animalInjured}>
          <h2 className={s.animalLockedTitle}>
            What to do if the animal is injured :
          </h2>
          <ul className={s.animalLockedList}>
            <li className={s.animalInjuredItem}>
              Wash the wound with clean water.
            </li>
            <li className={s.animalInjuredItem}>
              If the wound is in the lower part of the paw, it is better to
              bandage the limb to avoid contamination.
            </li>
            <li className={s.animalInjuredItem}>
              If the animal is bleeding heavily, apply a tourniquet or tight
              bandage and find the nearest veterinary hospital.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CloseIcon from "../../assets/icons/close.svg?react"
import ArrowLeft from "../../assets/icons/arrowLeft.svg?react"
import s from "./AddFluffyForm.module.css"
import fluffyImage from "../../assets/images/fluffy.jpeg"
import useImagePreview, {
  useAppDispatch,
  useAppSelector,
} from "../../services/hooks"
import addFluffyOperations, {
  fetchFluffies,
} from "../../redux/fluffies/fluffiesOperations"
import { fileToByteArray } from "../../services/helpers"

interface AddFluffyFormProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddFluffyForm: React.FC<AddFluffyFormProps> = ({
  setModalOpen,
}) => {
  const TOTAL_STEPS = 3
  const [currentStep, setCurrentStep] = useState(1)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const dispatch = useAppDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  })

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let imageByteArray: number[] | undefined

      // Convert image file to byte array
      if (imageFile) {
        const byteArray = await fileToByteArray(imageFile)
        imageByteArray = Array.from(byteArray)
      } else {
        const response = await fetch(fluffyImage)
        const blob = await response.blob()
        const defaultImageFile = new File([blob], "fluffy.jpeg", {
          type: blob.type,
          lastModified: new Date().getTime(),
        })
        const byteArray = await fileToByteArray(defaultImageFile)
        imageByteArray = Array.from(byteArray)
      }

      const requestData = {
        ...data,
        image: imageByteArray,
        imageUrl: undefined,
      }

      const actionResult = await dispatch(
        addFluffyOperations.addFluffy(requestData),
      )

      if (addFluffyOperations.addFluffy.fulfilled.match(actionResult)) {
        dispatch(fetchFluffies(0))
      } else {
        console.error("Failed to add fluffy:", actionResult.error)
      }

      reset()
      setCurrentStep(1)
      setImageFile(null)
      setModalOpen(false)

      setTimeout(() => {
        dispatch(fetchFluffies(0))
      }, 5000)
    } catch (error) {
      console.error("Error converting file to byte array:", error)
      // Handle error
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || !files.item(0)) return
    setImageFile(files.item(0))
  }

  const previewSrc = useImagePreview(imageFile)

  return (
    <div className={s.addFluffy}>
      <div className={s.addFluffy__block}>
        <div className={s.logoButtons}>
          {currentStep > 1 ? (
            <div className={s.logoButton} onClick={handleBack}>
              <ArrowLeft />
            </div>
          ) : (
            <div></div>
          )}

          <div className={s.logoButton} onClick={() => setModalOpen(false)}>
            <CloseIcon />
          </div>
        </div>

        <p className={s.addFluffy__step}>
          STEP {currentStep} of {TOTAL_STEPS}
        </p>
        <h2 className={s.addFluffy__title}>Add fluffy in need</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div>
              <div>
                <label>
                  Nickname
                  <input
                    {...register("name", {
                      required: "Please add the Nickname",
                      minLength: {
                        value: 3,
                        message: "The name should have more than 3 symbols",
                      },
                    })}
                  />
                </label>
                <div>
                  {errors?.name && (
                    <p>
                      {(errors?.name?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Animal type
                  <select
                    {...register("type", {
                      required: "Please choose the animal type",
                    })}
                  >
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="domestic">Domestic animals</option>
                    <option value="other">Other animals</option>
                  </select>
                </label>
                <div>
                  {errors?.type && (
                    <p>
                      {(errors?.type?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Age
                  <input
                    {...register("age", {
                      required: "Please add the approximate age",
                    })}
                  />
                </label>
                <div>
                  {errors?.age && (
                    <p>
                      {(errors?.age?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Sex
                  <select
                    {...register("sex", {
                      required: "Please choose the animal sex",
                    })}
                  >
                    <option value="">Choose sex</option>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                  </select>
                </label>
                <div>
                  {errors?.sex && (
                    <p>
                      {(errors?.sex?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Health condition
                  <select
                    {...register("healthCondition", {
                      required: "Please choose the animal health condition",
                    })}
                  >
                    <option value="needs help">Needs help</option>
                    <option value="critical">Critical</option>
                  </select>
                </label>
                <div>
                  {errors?.healthCondition && (
                    <p>
                      {(errors?.healthCondition?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div>
                <label>
                  Sterilization
                  <select
                    {...register("sterilization", {
                      required: "Please choose is animal sterilized",
                    })}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
                <div>
                  {errors?.sterilization && (
                    <p>
                      {(errors?.sterilization?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Size
                  <select
                    {...register("size", {
                      required: "Please choose the animal size",
                    })}
                  >
                    <option value="medium">Medium</option>
                    <option value="little">Little</option>
                    <option value="big">Big</option>
                  </select>
                </label>
                <div>
                  {errors?.size && (
                    <p>
                      {(errors?.size?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Location
                  <select
                    {...register("location", {
                      required: "Please choose the animal size",
                    })}
                    className={s.select}
                  >
                    <option value={"other"} className={s.menuItem}>
                      Other
                    </option>
                    <option value={"chekasy"} className={s.menuItem}>
                      Chekasy
                    </option>
                    <option value={"chernihiv"} className={s.menuItem}>
                      Chernihiv
                    </option>
                    <option value={"chernivtsi"} className={s.menuItem}>
                      Chernivtsi
                    </option>
                    <option value={"dnipropetrovsk"} className={s.menuItem}>
                      Dnipropetrovsk
                    </option>
                    <option value={"donetsk"} className={s.menuItem}>
                      Donetsk
                    </option>
                    <option value={"ivanoFrankivsk"} className={s.menuItem}>
                      Ivano-Frankivsk
                    </option>
                    <option value={"kharkiv"} className={s.menuItem}>
                      Kharkiv
                    </option>
                    <option value={"kherson"} className={s.menuItem}>
                      Kherson
                    </option>
                    <option value={"khmelnytskyi"} className={s.menuItem}>
                      Khmelnytskyi
                    </option>
                    <option value={"kyiv"} className={s.menuItem}>
                      Kyiv
                    </option>
                    <option value={"kirovohrad"} className={s.menuItem}>
                      Kirovohrad
                    </option>
                    <option value={"luhansk"} className={s.menuItem}>
                      Luhansk
                    </option>
                    <option value={"lviv"} className={s.menuItem}>
                      Lviv
                    </option>
                    <option value={"mykolaiv"} className={s.menuItem}>
                      Mykolaiv
                    </option>
                    <option value={"odessa"} className={s.menuItem}>
                      Odessa
                    </option>
                    <option value={"poltava"} className={s.menuItem}>
                      Poltava
                    </option>
                    <option value={"rivne"} className={s.menuItem}>
                      Rivne
                    </option>
                    <option value={"sumy"} className={s.menuItem}>
                      Sumy
                    </option>
                    <option value={"ternopil "} className={s.menuItem}>
                      Ternopil
                    </option>
                    <option value={"vinnytsia"} className={s.menuItem}>
                      Vinnytsia
                    </option>
                    <option value={"volyn"} className={s.menuItem}>
                      Volyn
                    </option>
                    <option value={"zakarpattia"} className={s.menuItem}>
                      Zakarpattia
                    </option>
                    <option value={"zaporizhia"} className={s.menuItem}>
                      Zaporizhia
                    </option>
                    <option value={"zhytomyr"} className={s.menuItem}>
                      Zhytomyr
                    </option>
                    <option value={"crimea"} className={s.menuItem}>
                      Crimea
                    </option>
                  </select>
                </label>
                <div>
                  {errors?.location && (
                    <p>
                      {(errors?.location?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Habitat
                  <select
                    {...register("habitat", {
                      required: "Please choose the animal size",
                    })}
                  >
                    <option value="stray">Stray</option>
                    <option value="goodHands">In good hands</option>
                    <option value="shelter">In shelter</option>
                  </select>
                </label>
                <div>
                  {errors?.habitat && (
                    <p>
                      {(errors?.habitat?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div style={{ width: "300px" }}>
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    backgroundColor: "silver",
                    overflow: "hidden",
                  }}
                >
                  {imageFile && (
                    <img
                      src={previewSrc}
                      alt="Fluffy photo"
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  aria-label="Upload image"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>
                  Type comments (optional)
                  <textarea {...register("comments")} />
                </label>
              </div>

              <div>
                <label>
                  Donate size (UAH)
                  <input
                    {...register("priceForDonate", {
                      required: "Please add the price needed for donate",
                    })}
                    defaultValue={0}
                    type="number"
                    min={0}
                  />
                </label>
                <div>
                  {errors?.priceForDonate && (
                    <p>
                      {(errors?.priceForDonate?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label>
                  Accumulated donates (UAH)
                  <input
                    {...register("accumulatedPrice", {
                      required: "Please add the sum of accumulated money",
                    })}
                    defaultValue={0}
                    type="number"
                    min={0}
                  />
                </label>
                <div>
                  {errors?.accumulatedPrice && (
                    <p>
                      {(errors?.accumulatedPrice?.message as React.ReactNode) ||
                        "Unexpected error!"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              disabled={!isValid}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Continue
            </button>
          ) : (
            <input type="submit" disabled={!isValid} />
          )}
        </form>
      </div>
    </div>
  )
}

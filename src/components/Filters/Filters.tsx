import { useCallback, useState } from "react"
import { debounce } from "lodash"
import s from "./Filters.module.css"
import SearchIcon from "../../assets/icons/icon-search.svg?react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../services/hooks"
import * as searchOperation from "../../redux/fluffies/fluffiesOperations"

export const Filters = () => {
  const [fluffy, setFluffy] = useState("")
  const [purpose, setPurpose] = useState("")
  const [health, setHealth] = useState("")
  const [animalType, setAnimalType] = useState("")
  const [animalLocation, setAnimalLocation] = useState("")
  const [habitat, setHabitat] = useState("")

  const dispatch = useAppDispatch()

  const handleSearchRequest = useCallback(
    debounce(
      (value: string) => {
        dispatch(
          searchOperation.fetchFluffies({
            fluffy: value,
            ////need dispatch only search
            purpose,
            healthCondition: health,
            animalType,
            location: animalLocation,
            habitat,
          }),
        )
      },
      300,
      { trailing: true },
    ),
    [dispatch, fluffy, purpose, health, animalType, animalLocation, habitat],
  )

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget
    setFluffy(value)

    handleSearchRequest(value)
  }

  const handleFiltersChange = ({
    target: { name, value },
  }: SelectChangeEvent) => {
    switch (name) {
      case "purpose":
        setPurpose(value as string)
        dispatch(
          searchOperation.fetchFluffies({
            fluffy,
            purpose: value,
            healthCondition: health,
            animalType,
            location: animalLocation,
            habitat,
          }),
        )
        break

      case "health":
        setHealth(value as string)
        dispatch(
          searchOperation.fetchFluffies({
            fluffy,
            purpose,
            healthCondition: value,
            animalType,
            location: animalLocation,
            habitat,
          }),
        )
        break

      case "animalType":
        setAnimalType(value as string)
        dispatch(
          searchOperation.fetchFluffies({
            fluffy,
            purpose,
            healthCondition: health,
            animalType: value,
            location: animalLocation,
            habitat,
          }),
        )
        break

      case "animalLocation":
        setAnimalLocation(value as string)
        dispatch(
          searchOperation.fetchFluffies({
            fluffy,
            purpose,
            healthCondition: health,
            animalType,
            location: value,
            habitat,
          }),
        )
        break

      case "habitat":
        setHabitat(value as string)
        dispatch(
          searchOperation.fetchFluffies({
            fluffy,
            purpose,
            healthCondition: health,
            animalType,
            location: animalLocation,
            habitat: value,
          }),
        )
        break

      default:
        toast.info("Something unexpected and new :-)")
    }
  }

  return (
    <div>
      <form className={s.form}>
        <div className={s.formInput}>
          <div className={s.searchIcon}>
            <SearchIcon />
          </div>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Find your fluffy friends"
            value={fluffy}
            onChange={handleInputChange}
          />
        </div>
        <div className={s.filtersBlock}>
          {/* Purpose */}
          <FormControl className={s.textField} sx={{ padding: 0 }}>
            <InputLabel
              className={s.inputLabel}
              sx={{
                "&.MuiFormLabel-filled, &.Mui-focused": {
                  color: "var(--Primary100)",
                  bgcolor: "var(--sand)",
                  top: 0,
                },
              }}
              id="purpose"
            >
              Purpose
            </InputLabel>

            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "8px",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    bgcolor: "var(--Gray0)",
                  },
                },
              }}
              sx={{
                padding: 0,
                height: 40,
                width: 160,
                borderRadius: 30,
                border: "1px solid var(--Gray70)",
                "& fieldset": { border: "none" },
                overflow: "hidden",
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
              }}
              name="purpose"
              labelId="purpose"
              id="purpose"
              value={purpose}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"Feed"} className={s.menuItem}>
                Feed
              </MenuItem>
              <MenuItem value={"Treatment"} className={s.menuItem}>
                Treatment
              </MenuItem>
              <MenuItem value={"Household needs"} className={s.menuItem}>
                Household needs
              </MenuItem>
              <MenuItem value={"Adopt"} className={s.menuItem}>
                Adopt
              </MenuItem>
              <MenuItem value={""} className={s.menuItem}>
                Clear
              </MenuItem>
            </Select>
          </FormControl>

          {/* Health condition */}
          <FormControl className={s.textField} sx={{ padding: 0 }}>
            <InputLabel
              className={s.inputLabel}
              sx={{
                "&.MuiFormLabel-filled, &.Mui-focused": {
                  color: "var(--Primary100)",
                  backgroundColor: "var(--sand)",
                  top: 0,
                },
              }}
              id="health"
            >
              Health condition
            </InputLabel>

            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "8px",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    bgcolor: "var(--Gray0)",
                  },
                },
              }}
              sx={{
                padding: 0,
                height: 40,
                width: 160,
                borderRadius: 30,
                border: "1px solid var(--Gray70)",
                "& fieldset": { border: "none" },
                overflow: "hidden",
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
              }}
              name="health"
              labelId="Health condition"
              id="health"
              value={health}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"CRITICAL"} className={s.menuItem}>
                Critical
              </MenuItem>
              <MenuItem value={"NEEDS_HELP"} className={s.menuItem}>
                Need help
              </MenuItem>
              <MenuItem value={""} className={s.menuItem}>
                Clear
              </MenuItem>
            </Select>
          </FormControl>

          {/* Animal type */}
          <FormControl className={s.textField} sx={{ padding: 0 }}>
            <InputLabel
              className={s.inputLabel}
              sx={{
                "&.MuiFormLabel-filled, &.Mui-focused": {
                  color: "var(--Primary100)",
                  bgcolor: "var(--sand)",
                  top: 0,
                },
              }}
              id="animalType"
            >
              Animal type
            </InputLabel>

            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "8px",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    bgcolor: "var(--Gray0)",
                  },
                },
              }}
              sx={{
                padding: 0,
                height: 40,
                width: 160,
                borderRadius: 30,
                border: "1px solid var(--Gray70)",
                "& fieldset": { border: "none" },
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
                overflow: "hidden",
              }}
              name="animalType"
              labelId="animalType"
              id="animalType"
              value={animalType}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"cat"} className={s.menuItem}>
                Cat
              </MenuItem>
              <MenuItem value={"dog"} className={s.menuItem}>
                Dog
              </MenuItem>
              <MenuItem value={"domestic"} className={s.menuItem}>
                Domestic animals
              </MenuItem>
              <MenuItem value={"other"} className={s.menuItem}>
                Other animals
              </MenuItem>
              <MenuItem value={""} className={s.menuItem}>
                Clear
              </MenuItem>
            </Select>
          </FormControl>

          {/* Location */}
          <FormControl className={s.textField} sx={{ padding: 0 }}>
            <InputLabel
              className={s.inputLabel}
              sx={{
                "&.MuiFormLabel-filled, &.Mui-focused": {
                  color: "var(--Primary100)",
                  bgcolor: "var(--sand)",
                  top: 0,
                },
              }}
              id="animalLocation"
            >
              Location
            </InputLabel>

            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: "169px",
                    marginTop: "8px",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    bgcolor: "var(--Gray0)",
                  },
                },
              }}
              sx={{
                padding: 0,
                height: 40,
                width: 160,
                borderRadius: 30,
                border: "1px solid var(--Gray70)",
                "& fieldset": { border: "none" },
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
                overflow: "hidden",
              }}
              name="animalLocation"
              labelId="animalLocation"
              id="animalLocation"
              value={animalLocation}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"chekasy"} className={s.menuItem}>
                Chekasy
              </MenuItem>
              <MenuItem value={"chernihiv"} className={s.menuItem}>
                Chernihiv
              </MenuItem>
              <MenuItem value={"chernivtsi"} className={s.menuItem}>
                Chernivtsi
              </MenuItem>
              <MenuItem value={"dnipropetrovsk"} className={s.menuItem}>
                Dnipropetrovsk
              </MenuItem>
              <MenuItem value={"donetsk"} className={s.menuItem}>
                Donetsk
              </MenuItem>

              <MenuItem value={"ivanoFrankivsk"} className={s.menuItem}>
                Ivano-Frankivsk
              </MenuItem>
              <MenuItem value={"kharkiv"} className={s.menuItem}>
                Kharkiv
              </MenuItem>
              <MenuItem value={"kherson"} className={s.menuItem}>
                Kherson
              </MenuItem>
              <MenuItem value={"khmelnytskyi"} className={s.menuItem}>
                Khmelnytskyi
              </MenuItem>
              <MenuItem value={"kyiv"} className={s.menuItem}>
                Kyiv
              </MenuItem>

              <MenuItem value={"kirovohrad"} className={s.menuItem}>
                Kirovohrad
              </MenuItem>
              <MenuItem value={"luhansk"} className={s.menuItem}>
                Luhansk
              </MenuItem>
              <MenuItem value={"lviv"} className={s.menuItem}>
                Lviv
              </MenuItem>
              <MenuItem value={"mykolaiv"} className={s.menuItem}>
                Mykolaiv
              </MenuItem>
              <MenuItem value={"odessa"} className={s.menuItem}>
                Odessa
              </MenuItem>

              <MenuItem value={"poltava"} className={s.menuItem}>
                Poltava
              </MenuItem>
              <MenuItem value={"rivne"} className={s.menuItem}>
                Rivne
              </MenuItem>
              <MenuItem value={"sumy"} className={s.menuItem}>
                Sumy
              </MenuItem>
              <MenuItem value={"ternopil"} className={s.menuItem}>
                Ternopil
              </MenuItem>
              <MenuItem value={"vinnytsia"} className={s.menuItem}>
                Vinnytsia
              </MenuItem>

              <MenuItem value={"volyn"} className={s.menuItem}>
                Volyn
              </MenuItem>
              <MenuItem value={"zakarpattia"} className={s.menuItem}>
                Zakarpattia
              </MenuItem>
              <MenuItem value={"zaporizhia"} className={s.menuItem}>
                Zaporizhia
              </MenuItem>
              <MenuItem value={"zhytomyr"} className={s.menuItem}>
                Zhytomyr
              </MenuItem>
              <MenuItem value={"crimea"} className={s.menuItem}>
                Crimea
              </MenuItem>

              <MenuItem value={"other"} className={s.menuItem}>
                Other
              </MenuItem>

              <MenuItem value={""} className={s.menuItem}>
                Clear
              </MenuItem>
            </Select>
          </FormControl>

          {/* Habitat */}
          <FormControl className={s.textField} sx={{ padding: 0 }}>
            <InputLabel
              className={s.inputLabel}
              sx={{
                "&.MuiFormLabel-filled, &.Mui-focused": {
                  color: "var(--Primary100)",
                  bgcolor: "var(--sand)",
                  top: 0,
                },
              }}
              id="habitat"
            >
              Habitat
            </InputLabel>

            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "8px",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    bgcolor: "var(--Gray0)",
                  },
                },
              }}
              sx={{
                padding: 0,
                height: 40,
                width: 160,
                borderRadius: 30,
                border: "1px solid var(--Gray70)",
                "& fieldset": { border: "none" },
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
                overflow: "hidden",
              }}
              name="habitat"
              labelId="habitat"
              id="habitat"
              value={habitat}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"IN_GOOD_HANDS"} className={s.menuItem}>
                In good hands
              </MenuItem>
              <MenuItem value={"IN_SHELTER"} className={s.menuItem}>
                In a shelter
              </MenuItem>
              <MenuItem value={"STRAY"} className={s.menuItem}>
                Stray
              </MenuItem>
              <MenuItem value={""} className={s.menuItem}>
                Clear
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </div>
  )
}

const cities = ["Kyiv", "Irpin", "Kozyatin"]

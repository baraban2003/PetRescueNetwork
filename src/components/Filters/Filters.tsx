import { useCallback, useState } from "react"
import { debounce } from "lodash"
import s from "./Filters.module.css"
import SearchIcon from "../../assets/icons/icon-search.svg?react"
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { toast } from "react-toastify"

export const Filters = () => {
  const [fluffy, setFluffy] = useState("")
  const [purpose, setPurpose] = useState("")
  const [health, setHealth] = useState("")
  const [animalType, setAnimalType] = useState("")
  const [animalLocation, setAnimalLocation] = useState("")
  const [habitat, setHabitat] = useState("")

  const handleSearchRequest = useCallback(
    debounce(
      (value: string) => {
        console.log("Performing search for:", value)
        //!!!Important - this will send request to the server
      },
      300,
      { trailing: true },
    ),
    [],
  )

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget
    setFluffy(value)

    // Call the memoized debounced search function with the current value
    handleSearchRequest(value)
  }

  const handleFiltersChange = (event: SelectChangeEvent) => {
    switch (event.target.name) {
      case "purpose":
        setPurpose(event.target.value as string)
        break

      case "health":
        setHealth(event.target.value as string)
        break

      case "animalType":
        setAnimalType(event.target.value as string)
        break

      case "animalLocation":
        setAnimalLocation(event.target.value as string)
        break

      case "habitat":
        setHabitat(event.target.value as string)
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
                  color: "var(--Gray70)",
                  backgroundColor: "var(--sand)",
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
                    bgcolor: "pink",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    background: "var(--Gray0)",
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--Gray70)",
                },
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
                overflow: "hidden",
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
                  color: "var(--Gray70)",
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
                    bgcolor: "pink",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    background: "var(--Gray0)",
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--Gray70)",
                },
                "&.MuiInputBase-root": {
                  color: "var(--Gray100)",
                  fontFamily: "Gambetta",
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                },
                overflow: "hidden",
              }}
              name="health"
              labelId="Health condition"
              id="health"
              value={health}
              onChange={handleFiltersChange}
            >
              <MenuItem value={"Critical"} className={s.menuItem}>
                Critical
              </MenuItem>
              <MenuItem value={"Need help"} className={s.menuItem}>
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
                  color: "var(--Gray70)",
                  backgroundColor: "var(--sand)",
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
                    bgcolor: "pink",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    background: "var(--Gray0)",
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--Gray70)",
                },
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
              <MenuItem value={"Cat"} className={s.menuItem}>
                Cat
              </MenuItem>
              <MenuItem value={"Dog"} className={s.menuItem}>
                Dog
              </MenuItem>
              <MenuItem value={"Cat and Dog"} className={s.menuItem}>
                Cat and Dog
              </MenuItem>
              <MenuItem value={"Domestic animals"} className={s.menuItem}>
                Domestic animals
              </MenuItem>
              <MenuItem value={"Other animals"} className={s.menuItem}>
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
                  color: "var(--Gray70)",
                  backgroundColor: "var(--sand)",
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
                    bgcolor: "pink",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    background: "var(--Gray0)",
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--Gray70)",
                },
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
              <MenuItem value={"Chekasy"} className={s.menuItem}>
                Chekasy
              </MenuItem>
              <MenuItem value={"Chernihiv"} className={s.menuItem}>
                Chernihiv
              </MenuItem>
              <MenuItem value={"Chernivtsi"} className={s.menuItem}>
                Chernivtsi
              </MenuItem>
              <MenuItem value={"Dnipropetrovsk"} className={s.menuItem}>
                Dnipropetrovsk
              </MenuItem>
              <MenuItem value={"Donetsk"} className={s.menuItem}>
                Donetsk
              </MenuItem>

              <MenuItem value={"Ivano-Frankivsk"} className={s.menuItem}>
                Ivano-Frankivsk{" "}
              </MenuItem>
              <MenuItem value={"Kharkiv"} className={s.menuItem}>
                {" "}
                Kharkiv
              </MenuItem>
              <MenuItem value={"Kherson"} className={s.menuItem}>
                Kherson{" "}
              </MenuItem>
              <MenuItem value={"Khmelnytskyi"} className={s.menuItem}>
                {" "}
                Khmelnytskyi
              </MenuItem>
              <MenuItem value={"Kyiv"} className={s.menuItem}>
                {" "}
              </MenuItem>

              <MenuItem value={"Kirovohrad"} className={s.menuItem}>
                {" "}
                Kirovohrad
              </MenuItem>
              <MenuItem value={"Luhansk"} className={s.menuItem}>
                Luhansk{" "}
              </MenuItem>
              <MenuItem value={"Lviv"} className={s.menuItem}>
                {" "}
                Lviv
              </MenuItem>
              <MenuItem value={"Mykolaiv"} className={s.menuItem}>
                Mykolaiv{" "}
              </MenuItem>
              <MenuItem value={"Odessa"} className={s.menuItem}>
                Odessa{" "}
              </MenuItem>

              <MenuItem value={"Poltava"} className={s.menuItem}>
                Poltava
              </MenuItem>
              <MenuItem value={"Rivne"} className={s.menuItem}>
                {" "}
                Rivne
              </MenuItem>
              <MenuItem value={"Sumy"} className={s.menuItem}>
                {" "}
                Sumy
              </MenuItem>
              <MenuItem value={"Ternopil "} className={s.menuItem}>
                Ternopil{" "}
              </MenuItem>
              <MenuItem value={"Vinnytsia"} className={s.menuItem}>
                {" "}
                Vinnytsia
              </MenuItem>

              <MenuItem value={"Volyn"} className={s.menuItem}>
                Volyn{" "}
              </MenuItem>
              <MenuItem value={"Zakarpattia"} className={s.menuItem}>
                {" "}
                Zakarpattia
              </MenuItem>
              <MenuItem value={"Zaporizhia"} className={s.menuItem}>
                {" "}
                Zaporizhia
              </MenuItem>
              <MenuItem value={"Zhytomyr"} className={s.menuItem}>
                Zhytomyr{" "}
              </MenuItem>
              <MenuItem value={"Crimea"} className={s.menuItem}>
                Crimea
              </MenuItem>

              <MenuItem value={"Other"} className={s.menuItem}>
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
                  color: "var(--Gray70)",
                  backgroundColor: "var(--sand)",
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
                    bgcolor: "pink",
                    border: "1px solid var(--Gray80)",
                    borderRadius: "20px",
                    background: "var(--Gray0)",
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--Gray70)",
                },
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
              <MenuItem value={"In good hands"} className={s.menuItem}>
                In good hands
              </MenuItem>
              <MenuItem value={"In a shelter"} className={s.menuItem}>
                In a shelter
              </MenuItem>
              <MenuItem value={"Stray"} className={s.menuItem}>
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

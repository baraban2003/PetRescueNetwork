import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchOneFluffy = createAsyncThunk(
  "fluffies/fetchOneFluffy",
  async (id: number | undefined, thunkAPI) => {
    try {
      const response = await axios.get(`api/pets/search/${id}`)
      const fluffy = response.data

      const fluffyWithImageUrl = {
        ...fluffy,
        img: `http://ec2-16-170-239-45.eu-north-1.compute.amazonaws.com/api/pets/image/${fluffy.imageId}`,
      }

      return fluffyWithImageUrl
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred",
      )
    }
  },
)

const operations = {
  fetchOneFluffy,
}
export default operations

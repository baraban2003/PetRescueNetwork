import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Fluffy } from "../../types/Fluffy"

export const fetchFluffies = createAsyncThunk(
  "fluffies/fetchAll",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/pets/search?page=${page}&size=16&sort=name`,
      )
      const fluffiesWithImageUrls = response.data.map((item: any) => ({
        ...item,
        imageUrl: `http://ec2-16-170-239-45.eu-north-1.compute.amazonaws.com/api/pets/image/${item.petImageId}`,
      }))

      return fluffiesWithImageUrls
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An error occurred",
      )
    }
  },
)

const addFluffy = createAsyncThunk(
  "fluffies/add",
  async (fluffyData: Fluffy, thunkAPI) => {
    const state = thunkAPI.getState()
    const persistedToken = (state as { auth: { token: string } }).auth.token

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Please login or register")
    }
    try {
      const response = await axios.post("/api/pets", fluffyData, {
        headers: {
          Authorization: `Bearer ${persistedToken}`,
        },
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Failed to add fluffy",
      )
    }
  },
)
const operations = {
  fetchFluffies,
  addFluffy,
}
export default operations

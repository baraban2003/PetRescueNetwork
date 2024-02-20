import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const fetchFluffies = createAsyncThunk(
  "fluffies/fetchAll",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/pets?page=${page}&size=1&sort=string`,
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e instanceof Error ? e.message : "An error occurred",
      )
    }
  },
)

export default fetchFluffies

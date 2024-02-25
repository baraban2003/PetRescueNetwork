import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { FluffyShort } from "../../types/Fluffy"

const fetchFluffies = createAsyncThunk(
  "fluffies/fetchAll",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/pets/search?page=${page}&size=8&sort=name`,
      )

      const fluffiesWithImageUrls = response.data.map((item: any) => ({
        ...item,
        imageUrl: `http://ec2-16-170-239-45.eu-north-1.compute.amazonaws.com/api/pets/image/${item.petImageId}`,
      }))
      return fluffiesWithImageUrls
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e instanceof Error ? e.message : "An error occurred",
      )
    }
  },
)

export default fetchFluffies

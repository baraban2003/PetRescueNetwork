import { createSlice } from "@reduxjs/toolkit"
import { fetchOneFluffy } from "./oneFluffyOperations"
import { Fluffy } from "../../types/Fluffy"

interface FluffiesState {
  item: Fluffy | null
  isLoading: boolean
  error: any
}

const initialState: FluffiesState = {
  item: null,
  isLoading: false,
  error: null,
}

const oneFluffySlice = createSlice({
  name: "oneFluffy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneFluffy.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.item = null
      })
      .addCase(fetchOneFluffy.fulfilled, (state, action) => {
        state.item = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchOneFluffy.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.item = null
      })
  },
})

export default oneFluffySlice.reducer

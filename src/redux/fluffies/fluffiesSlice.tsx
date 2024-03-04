import { createSlice } from "@reduxjs/toolkit"
import fluffies from "./fluffiesOperations"
import { Fluffy } from "../../types/Fluffy"

type Fluffies = {
  items: Fluffy[]
  isLoading: boolean
  error: any
}

const initialState: Fluffies = {
  items: [],
  isLoading: false,
  error: null,
}

const fluffiesSlice = createSlice({
  name: "fluffies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fluffies.fetchFluffies.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.items = []
      })
      .addCase(fluffies.fetchFluffies.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fluffies.fetchFluffies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fluffies.addFluffy.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fluffies.addFluffy.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(fluffies.addFluffy.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default fluffiesSlice.reducer

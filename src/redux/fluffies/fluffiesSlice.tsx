import { createSlice } from "@reduxjs/toolkit"
import fluffies from "./fluffiesOperations"
import { FluffyShort } from "../../types/Fluffy"

type Fluffies = {
  items: FluffyShort[]
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
    builder.addCase(fluffies.pending, (state) => {
      state.isLoading = true
      state.error = null
      state.items = []
    })
    builder.addCase(fluffies.fulfilled, (state, action) => {
      state.items = action.payload
      state.isLoading = false
      state.error = null
    })
    builder.addCase(fluffies.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export default fluffiesSlice.reducer

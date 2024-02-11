import { createSlice } from "@reduxjs/toolkit"

type VisibleProperty = {
  navigationVisible: boolean
}

const initialState: VisibleProperty = {
  navigationVisible: true,
}

const navigationVisibleSlice = createSlice({
  name: "navigationVisible",
  initialState,
  reducers: {
    hideNavigation: (state) => {
      state.navigationVisible = false
    },
    showNavigation: (state) => {
      state.navigationVisible = true
    },
  },
})

export default navigationVisibleSlice.reducer
export const { hideNavigation, showNavigation } = navigationVisibleSlice.actions

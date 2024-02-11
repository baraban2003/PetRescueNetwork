import { createSlice } from "@reduxjs/toolkit"
import authOperations from "./authOperations"
import { User } from "../../types/User"

export const initialState: User = {
  user: {
    email: null,
    password: null,
    firstName: null,
    secondName: null,
    phone: null,
    location: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authOperations.fetchCurrentUser.pending, (state) => {
      state.isRefreshing = true
    })

    builder.addCase(
      authOperations.fetchCurrentUser.fulfilled,
      (state, action) => {
        state.user = action.payload.user
        state.isLoggedIn = true
        state.isRefreshing = false
      },
    )

    builder.addCase(authOperations.register.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    })

    builder.addCase(authOperations.logIn.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    })

    builder.addCase(authOperations.logOut.fulfilled, (state) => {
      state.user = {
        email: null,
        password: null,
        firstName: null,
        secondName: null,
        phone: null,
        location: null,
      }
      state.token = null
      state.isLoggedIn = false
      state.error = null
      window.location.reload()
    })

    builder.addCase(authOperations.fetchCurrentUser.rejected, (state) => {
      state.isRefreshing = false
      state.user = {
        email: null,
        password: null,
        firstName: null,
        secondName: null,
        phone: null,
        location: null,
      }
      state.token = null
      state.isLoggedIn = false
      state.error = "Unautorized"
    })
  },
})

export default authSlice.reducer

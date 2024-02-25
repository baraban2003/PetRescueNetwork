import { createSlice } from "@reduxjs/toolkit"
import authOperations from "./authOperations"
import { User } from "../../types/User"

const storedAuthString = localStorage.getItem("persist:auth")
const storedAuth = storedAuthString ? JSON.parse(storedAuthString) : null

const storedToken =
  storedAuth && storedAuth.token !== "null" ? storedAuth.token : null

export const initialState: User = {
  user: {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    phone: null,
    location: null,
  },
  token: storedToken || null,
  isLoggedIn: !!storedToken,
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
        state.user = action.payload
        state.isLoggedIn = true
        state.isRefreshing = false
      },
    )

    builder.addCase(authOperations.register.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
    })

    builder.addCase(authOperations.logIn.fulfilled, (state, action) => {
      state.user = action.payload
      state.token = action.payload.token
      state.isLoggedIn = true
    })

    builder.addCase(authOperations.logOut.fulfilled, (state) => {
      state.user = {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
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
        lastName: null,
        phone: null,
        location: null,
      }
      state.token = null
      state.isLoggedIn = false
      state.error = "Unauthorized"
    })
  },
})

export default authSlice.reducer

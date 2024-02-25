import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { Credentials, Login } from "../../services/types"

axios.defaults.baseURL =
  "http://ec2-16-170-239-45.eu-north-1.compute.amazonaws.com"

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  unset() {
    axios.defaults.headers.common.Authorization = ""
  },
}

const register = createAsyncThunk(
  "auth/register",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/registration", credentials)
      // toast.success("Registration successful. Logging in...")
      const loginAction = await thunkAPI.dispatch(logIn(credentials))
      const loginResult = unwrapResult(loginAction)
      return { ...data, ...loginResult }
    } catch (error) {
      toast.error("Error: Registration failed")
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const logIn = createAsyncThunk(
  "auth/login",
  async (credentials: Login, thunkAPI) => {
    const { email, password } = credentials
    try {
      const { data } = await axios.post("/api/auth/login", { email, password })
      token.set(data.token)
      // toast.success("Authentification successful!");

      return data
    } catch (error) {
      toast.error("Error. Try other credentials!")

      return thunkAPI.rejectWithValue(error)
    }
  },
)

const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    token.unset()
    // toast.success("Goodbye to the next session!");
  } catch (error) {
    toast.error("Error. Try again!")
    return thunkAPI.rejectWithValue(error)
  }
})

const fetchCurrentUser = createAsyncThunk(
  "api/auth/info",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const persistedToken = (state as { auth: { token: string } }).auth.token

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Please login or register")
    }
    token.set(persistedToken)
    try {
      const { data } = await axios.get("/api/auth/info")
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
}
export default operations

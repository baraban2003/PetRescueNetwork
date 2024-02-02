import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

axios.defaults.baseURL = "https://mate.academy/students-api"

type Credentials = {
  email: string
  password: string
  name: string
  secondName: string
  date: string
  phone: string
}

type ApiResponse = {
  user: any
  token: string
}

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  unset() {
    axios.defaults.headers.common.Authorization = ""
  },
}

const register: AsyncThunk<ApiResponse, Credentials, {}> = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", credentials)
      token.set(data.token)
      toast.success("Register is success.")

      return data
    } catch (error) {
      toast.error("404 Error: Server not found")

      return thunkAPI.rejectWithValue(error)
    }
  },
)

const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/login", credentials)
    token.set(data.token)
    toast.success("Authentification success!")

    return data
  } catch (error) {
    toast.error("Error. Try other credentials!")

    return thunkAPI.rejectWithValue(error)
  }
})

const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.get("/auth/logout")
    token.unset()
    toast.success("Goodbye to the next session!")
  } catch (error) {
    toast.success("Error. Try again!")
    return thunkAPI.rejectWithValue(error)
  }
})

const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const persistedToken = (state as { auth: { token: string } }).auth.token

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Please login or register")
    }
    token.set(persistedToken)
    try {
      const { data } = await axios.get("/user")
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
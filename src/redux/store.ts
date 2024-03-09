import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import navigationVisibleReducer from "./navigationVisible/navigationVisibleSlice"
import fluffiesReducer from "./fluffies/fluffiesSlice"
import oneFluffyReducer from "./oneFluffy/oneFluffySlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import authSlice from "./auth/authSlice"
import storage from "redux-persist/lib/storage"
import { User } from "../types/User"

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
}

const reducers = combineReducers({
  auth: persistReducer<User>(authPersistConfig, authSlice),
  navigationVisible: navigationVisibleReducer,
  getFluffies: fluffiesReducer,
  getOneFluffy: oneFluffyReducer,
})

export const store = configureStore({
  reducer: reducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.NODE_ENV === "development",
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

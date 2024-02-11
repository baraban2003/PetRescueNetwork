import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import navigationVisibleReducer from "./navigationVisible/navigationVisibleSlice"
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

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
}

const navigationVisiblePersistConfig = {
  key: "navigationVisible",
  storage,
  whitelist: ["navigationVisible"],
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    navigationVisible: persistReducer(
      navigationVisiblePersistConfig,
      navigationVisibleReducer,
    ),
  },

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
/* eslint-enable @typescript-eslint/indent */

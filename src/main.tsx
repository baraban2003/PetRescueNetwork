import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { StyledEngineProvider } from "@mui/material/styles"
import "./main.css"
import { Root } from "./Root"
import { persistor, store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <Root />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

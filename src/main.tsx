import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { StyledEngineProvider } from "@mui/material/styles"
import "./main.css"
import { Root } from "./Root"
import { store } from "./redux/store"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Root />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
)

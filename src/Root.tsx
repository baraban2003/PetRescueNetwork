import { Route, HashRouter as Router, Routes } from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Registration } from "./pages/Registration/Registration"
import { Login } from "./pages/LoginPage/"
import { Suspense } from "react"
import { Spinner } from "./pages/Spinner"

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="helpforfluffies">
          <Route path=":fluffie?" element={<HomePage />} />
        </Route>
        <Route path="howtohelp" element={<Spinner />} />
        <Route path="yourkindhearts" element={<Spinner />} />
        <Route
          path="register"
          element={
            <Suspense fallback={<Spinner />}>
              {/* <PublicRoute restricted> */}
              <Registration />
              {/* </PublicRoute> */}
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner />}>
              {/* <PublicRoute restricted> */}
              <Login />

              {/* </PublicRoute> */}
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
)

import { Route, HashRouter as Router, Routes } from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Registration } from "./pages/Registration/Registration"
import { Suspense } from "react"
import { Spinner } from "./pages/LoaderPage/LoaderPage"

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="pets">
          <Route path=":pet?" element={<HomePage />} />
        </Route>
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
              <Registration />

              {/* </PublicRoute> */}
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
)

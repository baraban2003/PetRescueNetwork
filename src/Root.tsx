import { Route, HashRouter as Router, Routes } from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Registration } from "./pages/Registration/Registration"
import { Login } from "./pages/LoginPage/"
import { Suspense } from "react"
import { Spinner } from "./components/Spinner"
import { HelpForFluffiesPage } from "./pages/HelpForFluffiesPage"
import { HowToHelpPage } from "./pages/HowToHelpPage"
import { KindHearts } from "./pages/KindHearts"

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="helpforfluffies">
          <Route path=":fluffie?" element={<HelpForFluffiesPage />} />
        </Route>
        <Route path="howtohelp" element={<HowToHelpPage />} />
        <Route path="yourkindhearts" element={<KindHearts />} />
        <Route
          path="register"
          element={
            <Suspense fallback={<Spinner />}>
              <Registration />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
)

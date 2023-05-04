import React from "react"
import "./App.css"
import { AuthContext } from "./components/AuthProvider"
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { MainPage } from "./pages/MainPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { TempCO2View } from "./views/TempCO2View"
import { RegisterView } from "./views/RegisterView"
import { LoginView } from "./views/LoginView"
import { EmissionsView } from "./views/EmissionsView"
import { UserCustomView } from "./views/UserCustomView"
import ProtectedRoute from "./components/ProtectedRoute"
import { VisitorPage } from "./pages/VisitorPage"
import { VisitorView } from "./views/VisitorView"

/**
 * Main application
 */
function App() {
  const { token } = React.useContext(AuthContext)
  return (
    <Routes>
      <Route path="/" element={token == null ? <Navigate to="/login" /> : <Navigate to="/tempco2" />} />
      <Route path="/login" element={<LoginPage />}>
        <Route index element={<LoginView />} />
      </Route>
      <Route path="/register" element={<LoginPage />}>
        <Route index element={<RegisterView />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      >
        <Route path="/tempco2" element={<TempCO2View />} />
        <Route path="/emissions" element={<EmissionsView />} />
        <Route path="/usercustom">
          <Route index element={<UserCustomView />} />
        </Route>
      </Route>
      <Route path=":stringId" element={<VisitorPage />}>
        <Route index element={<VisitorView />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

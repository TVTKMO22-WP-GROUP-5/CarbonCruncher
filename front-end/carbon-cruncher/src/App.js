import React, { useState } from "react"
import "./App.css"
import AuthProvider from "./components/AuthProvider"
import { Routes, Route, Navigate, Link } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { MainPage } from "./pages/MainPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { TempCO2View } from "./views/TempCO2View"
import { RegisterView } from "./views/RegisterView"
import { LoginView } from "./views/LoginView"
import { EmissionsView } from "./views/EmissionsView"
import { UserCustomView } from "./views/UserCustomView"

function App() {
  const [token, setToken] = useState(null)

  return (
    <AuthProvider>
      <div>
        <button onClick={() => setToken(1)}>set fake token</button>
        <button onClick={() => setToken(null)}>remove fake token</button>
        <Link className="link" to="/">
          root
        </Link>
        <Link className="link" to="/login">
          login
        </Link>
        <Link className="link" to="/register">
          register
        </Link>
        <Link className="link" to="/tempco2">
          tempco2
        </Link>
        <Link className="link" to="/emissions">
          emissions
        </Link>
        <Link className="link" to="/usercustom">
          usercustom
        </Link>
        <Link className="link" to="/usercustom/jfieowFEW">
          usercustom route view
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={token == null ? <Navigate to="/login" /> : <Navigate to="/tempco2" />}
        />
        <Route path="/login" element={<LoginPage />}>
          <Route index element={<LoginView />} />
        </Route>
        <Route path="/register" element={<LoginPage />}>
          <Route index element={<RegisterView />} />
        </Route>
        <Route element={<MainPage />}>
          <Route path="/tempco2" element={<TempCO2View />} />
          <Route path="/emissions" element={<EmissionsView />} />
          <Route path="/usercustom">
            <Route index element={<UserCustomView loggedIn={true} />} />
            <Route path=":stringId" element={<UserCustomView loggedIn={false} />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./components/AuthProvider"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// https://www.robinwieruch.de/react-router-authentication/
// Good router tutorial: https://www.youtube.com/watch?v=Ul3y1LXxzdU

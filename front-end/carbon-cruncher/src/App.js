import React from "react";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

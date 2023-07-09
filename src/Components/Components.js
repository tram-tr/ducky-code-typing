import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import AuthModule from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MainModule from "./Main/Main";
import AboutModule from "./About/MainAbout";

export default function Components() {
  useEffect(() => {
    document.title = "Duckytype";
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthModule />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/:username/main" element={<ProtectedRoute path="/:username/main" element={MainModule} />} />
        <Route path="/:username/about" element={<ProtectedRoute path="/:username/about" element={AboutModule} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
